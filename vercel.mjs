const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const config = {
  cleanUrls: true,
  trailingSlash: false,
  rewrites: [
    {
      source: "/datacenter-3d",
      destination: "/"
    }
  ],
  headers: isPreviewDeployment
    ? [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow"
            }
          ]
        }
      ]
    : []
};
