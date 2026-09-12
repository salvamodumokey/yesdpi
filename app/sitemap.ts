import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { tools } from "@/lib/tools-registry";
import { guides } from "@/lib/guides-registry";

const LAST_MODIFIED = new Date("2026-09-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/guides"];
  const toolPaths = tools.filter((t) => t.status === "available").map((t) => t.href);
  const guidePaths = guides.map((g) => g.href);

  return [...staticPaths, ...toolPaths, ...guidePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 0.9 : path === "/guides" ? 0.8 : 0.7,
  }));
}
