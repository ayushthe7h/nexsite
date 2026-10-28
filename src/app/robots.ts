import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /panel is a cosmetic demo page, not real staff tooling - see
        // docs/SECURITY-checkup.md. Kept out of search results so it's
        // never mistaken for the real thing.
        disallow: ["/panel"],
      },
    ],
  };
}
