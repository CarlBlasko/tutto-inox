import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "default",
  title: "My Sanity Site",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  plugins: [structureTool(), deskTool(), visionTool()],
  schema,
  basePath: "/studio",
});
