import { createClient } from "@sanity/client";
import { Post } from "../types/sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-10-20",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

export default async function Page() {
  const posts = (await client.fetch(
    `*[_type == "post"]{title, designer, year, "imageUrl": image.asset->url}`
  )) as Post[];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Sanity + Next.js demo</h1>
      <ul className="space-y-6">
        {posts.map((post: Post, index: number) => {
          return (
            <li
              key={index}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="mt-1 text-sm text-gray-600">
                {post.designer && <span>Designer: {post.designer}</span>}
                {post.designer && post.year && <span> • </span>}
                {post.year && <span>Year: {post.year}</span>}
              </div>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full max-w-md mt-2 rounded"
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
