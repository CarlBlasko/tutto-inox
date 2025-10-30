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
  // const posts = (await client.fetch(
  //   `*[_type == "post"]{title, designer, year, "imageUrl": image.asset->url}`
  // )) as Post[];
  const posts = [
    {
      id: 1,
      title: "Kitchen Renovation Tips",
      imageUrl: "https://picsum.photos/800/600?random=1",
    },
    {
      id: 2,
      title: "Modern Stainless Design",
      imageUrl: "https://picsum.photos/1200/500?random=2",
    },
    {
      id: 3,
      title: "Outdoor Cooking Setup",
      imageUrl: "https://picsum.photos/640/480?random=3",
    },
    {
      id: 4,
      title: "Minimal Interior Inspiration",
      imageUrl: "https://picsum.photos/400/700?random=4",
    },
    {
      id: 5,
      title: "Industrial Style Fixtures",
      imageUrl: "https://picsum.photos/900/900?random=5",
    },
    {
      id: 6,
      title: "Custom Metal Work Showcase",
      imageUrl: "https://picsum.photos/1600/800?random=6",
    },
    {
      id: 7,
      title: "Small Space Kitchen Ideas",
      imageUrl: "https://picsum.photos/500/400?random=7",
    },
    {
      id: 8,
      title: "Sleek Bathroom Designs",
      imageUrl: "https://picsum.photos/1080/720?random=8",
    },
    {
      id: 9,
      title: "Luxury Countertops",
      imageUrl: "https://picsum.photos/1280/960?random=9",
    },
    {
      id: 10,
      title: "Contemporary Home Exteriors",
      imageUrl: "https://picsum.photos/600/400?random=10",
    },
  ];

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
