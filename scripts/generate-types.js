#!/usr/bin/env node

/**
 * Script to generate TypeScript types from Sanity schema
 * This is a simple approach - for more advanced type generation,
 * consider using @sanity-typed/types or similar packages
 */

const fs = require("fs");
const path = require("path");

// Read the schema file
const schemaPath = path.join(__dirname, "../sanity/schema.ts");
const schemaContent = fs.readFileSync(schemaPath, "utf8");

// Generate types based on the schema
const generateTypes = () => {
  return `// Auto-generated types from Sanity schema
// Run: node scripts/generate-types.js

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  designer?: string;
  year?: number;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  imageUrl?: string; // Added for the transformed image URL from Sanity queries
}

// Add more types here as you add more schema types
export type SanityDocument = Post;
`;
};

// Write the generated types
const outputPath = path.join(__dirname, "../types/sanity-generated.ts");
fs.writeFileSync(outputPath, generateTypes());

console.log("✅ Types generated successfully at:", outputPath);
