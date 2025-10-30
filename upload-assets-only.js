import fs from "fs";
import path from "path";
import sanityClient from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

// ---- CONFIG ----
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // your projectId
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_READ_TOKEN, // must have write access
  useCdn: false,
});

const folderPath = "../inox-image-dump/images"; // folder with your images
const imageExtensions = /\.(jpg|jpeg|png|gif|svg)$/i;

// ---- HELPER: Recursively get all image files ----
function getFilesRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath));
    } else if (imageExtensions.test(file)) {
      results.push(filePath);
    }
  });

  return results;
}

// ---- MAIN UPLOAD FUNCTION ----
async function uploadImages() {
  const files = getFilesRecursive(folderPath);
  console.log(`Found ${files.length} images in ${folderPath}`);

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    console.log(`Uploading: ${fileName}...`);

    try {
      const uploadedAsset = await client.assets.upload(
        "image",
        fs.createReadStream(filePath),
        { filename: fileName }
      );

      console.log(`Uploaded asset: ${uploadedAsset._id}`);
    } catch (err) {
      console.error(`Failed for ${fileName}:`, err.message);
    }
  }

  console.log("All done!");
}

uploadImages().catch(console.error);
