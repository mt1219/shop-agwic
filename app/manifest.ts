import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AGWIC — Everything. Everywhere. Eventually.",
    short_name: "AGWIC",
    description:
      "American Global Worldwide International Commerce. A global conglomerate selling things that should not be sold.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#b3261e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
