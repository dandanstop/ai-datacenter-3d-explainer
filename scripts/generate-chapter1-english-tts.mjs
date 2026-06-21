import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const voiceId = "EXAVITQu4vr4xnSDxMaL";
const modelId = "eleven_multilingual_v2";
const outputFormat = "mp3_44100_128";

const segments = [
  { id: "power", heading: "01 Power & Energy Backbone" },
  { id: "cooling", heading: "02 Cooling & Heat Removal" },
  { id: "compute", heading: "03 Compute & AI Chips" },
  { id: "network", heading: "04 Networking & Data Movement" },
  { id: "site", heading: "05 Campus & Buildout" },
  { id: "ops", heading: "06 Cloud & AI Operations" }
];

function loadEnv(text) {
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([^=]+)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function extractEnglishTranscript(markdown, heading) {
  const headingLine = `## ${heading}`;
  const lines = markdown.split(/\r?\n/);
  const headingLineIndex = lines.findIndex((line) => line.startsWith(headingLine));
  if (headingLineIndex === -1) {
    throw new Error(`Missing heading: ${heading}`);
  }

  const nextHeadingLineIndex = lines.findIndex((line, index) => index > headingLineIndex && line.startsWith("## "));
  const sectionLines = nextHeadingLineIndex === -1
    ? lines.slice(headingLineIndex + 1)
    : lines.slice(headingLineIndex + 1, nextHeadingLineIndex);
  const section = sectionLines.join("\n");

  const englishMatch = section.match(/### en\s+([\s\S]*?)(?=\n### |\n## |$)/);
  if (!englishMatch) {
    throw new Error(`Missing English transcript for: ${heading}`);
  }
  return englishMatch[1].trim().replace(/\s+/g, " ");
}

async function generateAudio(apiKey, segment, text, outPath, previousText, nextText) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        language_code: "en",
        previous_text: previousText || undefined,
        next_text: nextText || undefined,
        apply_text_normalization: "on",
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.78,
          style: 0.25,
          speed: 0.96,
          use_speaker_boost: true
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs request failed for ${segment.id}: ${response.status} ${errorText}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(outPath, audio);
  return audio.length;
}

const root = process.cwd();
const envPath = path.join(root, ".env");
const transcriptPath = path.join(root, "docs", "chapter1-audio-transcripts.md");
const outputDir = path.join(root, "audio", "chapter1");

const env = loadEnv(await readFile(envPath, "utf8"));
const apiKey = env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error("Missing ELEVENLABS_API_KEY in .env or environment.");
}

const markdown = await readFile(transcriptPath, "utf8");
const jobs = segments.map((segment) => ({
  ...segment,
  text: extractEnglishTranscript(markdown, segment.heading)
}));

await mkdir(outputDir, { recursive: true });

for (let index = 0; index < jobs.length; index += 1) {
  const segment = jobs[index];
  const outPath = path.join(outputDir, `en-${segment.id}.mp3`);
  const previousText = jobs[index - 1]?.text;
  const nextText = jobs[index + 1]?.text;
  const bytes = await generateAudio(apiKey, segment, segment.text, outPath, previousText, nextText);
  console.log(`${segment.id}: ${outPath} (${bytes} bytes)`);
}
