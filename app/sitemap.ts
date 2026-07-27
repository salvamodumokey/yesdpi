import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { tools } from "@/lib/tools-registry";
import { guides } from "@/lib/guides-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/privacy", "/terms", "/contact", "/guides"];
  const toolPaths = tools.filter((t) => t.status === "available").map((t) => t.href);
  const guidePaths = guides.map((g) => g.href);

  return [...staticPaths, ...toolPaths, ...guidePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
