import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SBI Saathi AI — Banking Made Simple",
    short_name: "SBI Saathi",
    description:
      "A friendly, multilingual banking assistant — secure, private, and available 24/7.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1733",
    icons: [
      {
        src: "/sbi-logo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
