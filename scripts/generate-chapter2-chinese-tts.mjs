import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const voiceId = "BrbEfHMQu0fyclQR7lfh";
const modelId = "eleven_multilingual_v2";
const outputFormat = "mp3_44100_128";

const chapter = {
  id: "chapter2",
  transcript: path.join("docs", "chapter2-audio-transcripts.md"),
  outputDir: path.join("audio", "chapter2"),
  segments: [
    { id: "compare", heading: "Overview" },
    { id: "training", heading: "Training AI" },
    { id: "inference", heading: "Inference AI" }
  ]
};

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

function languageSection(markdown, languageHeading) {
  const lines = markdown.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${languageHeading}`);
  if (headingIndex === -1) throw new Error(`Missing ${languageHeading} section.`);
  const nextHeadingIndex = lines.findIndex((line, index) => index > headingIndex && line.startsWith("## "));
  const sectionLines = nextHeadingIndex === -1
    ? lines.slice(headingIndex + 1)
    : lines.slice(headingIndex + 1, nextHeadingIndex);
  return sectionLines.join("\n");
}

function extractSegment(section, heading) {
  const lines = section.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (headingIndex === -1) throw new Error(`Missing segment: ${heading}`);
  const nextHeadingIndex = lines.findIndex((line, index) => index > headingIndex && line.startsWith("### "));
  const segmentLines = nextHeadingIndex === -1
    ? lines.slice(headingIndex + 1)
    : lines.slice(headingIndex + 1, nextHeadingIndex);
  return segmentLines.join("\n").trim().replace(/\s+/g, " ");
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
        language_code: "zh",
        previous_text: previousText || undefined,
        next_text: nextText || undefined,
        apply_text_normalization: "on",
        voice_settings: {
          stability: 0.58,
          similarity_boost: 0.78,
          style: 0.22,
          speed: 0.94,
          use_speaker_boost: true
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs request failed for ${chapter.id}/${segment.id}: ${response.status} ${errorText}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(outPath, audio);
  return audio.length;
}

const root = process.cwd();
const env = loadEnv(await readFile(path.join(root, ".env"), "utf8"));
const apiKey = env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("Missing ELEVENLABS_API_KEY in .env or environment.");

const markdown = await readFile(path.join(root, chapter.transcript), "utf8");
const section = languageSection(markdown, "Chinese");
const jobs = chapter.segments.map((segment) => ({
  ...segment,
  text: extractSegment(section, segment.heading)
}));
const outputDir = path.join(root, chapter.outputDir);
await mkdir(outputDir, { recursive: true });

for (let index = 0; index < jobs.length; index += 1) {
  const segment = jobs[index];
  const outPath = path.join(outputDir, `zh-${segment.id}.mp3`);
  const previousText = jobs[index - 1]?.text;
  const nextText = jobs[index + 1]?.text;
  const bytes = await generateAudio(apiKey, segment, segment.text, outPath, previousText, nextText);
  console.log(`${chapter.id}/${segment.id}: ${outPath} (${bytes} bytes)`);
}
