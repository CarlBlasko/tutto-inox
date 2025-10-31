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
  return (
    <>
      <div className="box box--buttons">
        <img src="/images/plus.svg" alt="Plus" width={46} height={43} />
        <img src="/images/minus.svg" alt="Minus" width={46} height={43} />
      </div>
      <ImagePosts />

      <div className="box box--logo">
        <div>Find someone who looks at you </div>
        <div className="logo-box__logo-wrapper">
          <img
            src="/images/logo.svg"
            alt="Tutto Inox logo"
            width={61}
            height={35}
            style={{ display: "block" }}
          />
          <div>
            the way I look at stainless steel
            <br />
            Curated by Levi Di Marco
          </div>
        </div>
      </div>
    </>
  );
}

const ImagePosts = async () => {
  const posts = (await client.fetch(
    `*[_type == "post"]{title, designer, year, "imageUrl": image.asset->url}`
  )) as Post[];

  return (
    <ul className="image-grid">
      {posts.map((post: any, index: number) => {
        // {posts.map((post: Post, index: number) => {
        const { imageUrl, title } = post;

        if (!imageUrl) {
          return null;
        }

        return (
          <li key={index} className="image-item">
            <img src={post.imageUrl} alt={post.title ?? "image"} />
          </li>
        );
      })}
    </ul>
  );
};
