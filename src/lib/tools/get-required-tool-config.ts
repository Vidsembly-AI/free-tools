import type { ToolConfig } from "./tool-data";
import { getToolConfig } from "./tool-data";

export function getRequiredToolConfig(slug: string): ToolConfig {
  const config = getToolConfig(slug);

  if (!config) {
    throw new Error(`Tool configuration not found for slug: "${slug}"`);
  }

  return config;
}
