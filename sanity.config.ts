import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "default",
  title: "My Sanity Site",
  projectId: "4kub5cx2",
  dataset: "production",
  plugins: [structureTool()],
  schema,
});
