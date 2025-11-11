import sanityClient from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // your projectId
  dataset: "production",
  token: process.env.SANITY_UPLOAD_TOKEN, // must have write access
  apiVersion: "2023-10-01",
  useCdn: false,
});

// skapa galleri automatiskt
async function main() {
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...70]`
  );
  const imageRefs = assets.map((a) => ({
    _type: "image",
    asset: { _type: "reference", _ref: a._id },
  }));

  const gallery = {
    _type: "gallery",
    title: "Bulk-imported gallery",
    images: imageRefs,
  };

  const res = await client.create(gallery);
  console.log("✅ Created gallery:", res._id);
}

main().catch(console.error);
