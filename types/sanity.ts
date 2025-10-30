// Define the Post type based on your Sanity schema
export interface Post {
  _id: string;
  _type: "post";
  title?: string;
  designer?: string;
  year?: number;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  imageUrl?: string; // Added for the transformed image URL from Sanity queries
}
