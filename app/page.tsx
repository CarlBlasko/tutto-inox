import { createClient } from "@sanity/client";
import { galleryQuery } from "./lib/queries";
import JustifiedCustom from "./components/justified-custom";
// import { useState } from "react";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-10-20",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

export default async function Page() {
  const data = await client.fetch(galleryQuery);
  const images = data?.images || [];

  return (
    <>
      <JustifiedCustom images={images} />

      <div className="box box--logo">
        <div>Find someone who looks at you </div>
        <div className="box__logo-wrapper">
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
