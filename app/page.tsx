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
      <h1>Sanity + Next.js demo</h1>
      <ul>
        {posts.map((post: Post, index: number) => {
          return (
            <li key={index}>
              <h2>{post.title}</h2>
              <div>
                {post.designer && <span>Designer: {post.designer}</span>}
                {post.designer && post.year && <span> • </span>}
                {post.year && <span>Year: {post.year}</span>}
              </div>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
            </li>
          );
        })}
      </ul>
    </>
  );
}
