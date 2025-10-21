// Auto-generated types from Sanity schema
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
