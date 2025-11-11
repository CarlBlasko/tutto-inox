"use client";
import React, { useEffect, useRef } from "react";
// import "./justified-custom.scss";

type Img = {
  _id: string;
  url: string;
  width: number; // intrinsic width from Sanity
  height: number; // intrinsic height from Sanity
};

export default function JustifiedCustom({
  images,
  perRow = 3,
  gap = 12,
  desiredHeightMultiplier = 1.0, // tweak: >1 makes tall images proportionally taller
}: {
  images: Img[];
  perRow?: number;
  gap?: number;
  desiredHeightMultiplier?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // recompute layout on mount + resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const containerWidth = el.clientWidth;
      const rows: Img[][] = [];
      for (let i = 0; i < images.length; i += perRow) {
        rows.push(images.slice(i, i + perRow));
      }

      // Clear previous content
      el.innerHTML = "";

      rows.forEach((rowImgs, rowIndex) => {
        // desiredHeight_i ~ intrinsicHeight_i (so tall images want to be taller)
        const desiredHeights = rowImgs.map((img) => {
          const ratio = img.width / img.height;
          // Baseline: ratio=1 -> normal height
          // For very tall images (ratio<1), reduce height influence
          const normalized = Math.pow(ratio, 0.4); // 0.4 = gentle curve; tweak if needed
          return img.height * normalized * desiredHeightMultiplier;
        });

        // const desiredHeights = rowImgs.map(
        //   (img) => img.height * desiredHeightMultiplier
        // );
        // aspect ratios w/h
        const ratios = rowImgs.map((img) => img.width / img.height);

        // Compute width contribution for each if we used desiredHeights:
        // width_i_desired = desiredHeight_i * ratio_i
        const desiredWidths = desiredHeights.map((h, i) => h * ratios[i]);

        // compute scale so that sum(width_i_desired * scale) + gaps = containerWidth
        const totalDesiredWidth = desiredWidths.reduce((s, w) => s + w, 0);
        const totalGap = gap * (rowImgs.length - 1);
        const availableWidth = Math.max(containerWidth - totalGap, 1);

        // scale factor:
        const scale =
          totalDesiredWidth > 0 ? availableWidth / totalDesiredWidth : 1;

        // final heights and widths
        const finalHeights = desiredHeights.map((h) => h * scale);
        const finalWidths = finalHeights.map((h, i) => h * ratios[i]);

        // build row container
        const row = document.createElement("div");
        row.className = "jc-row";
        // row.style.gap = `${gap}px`;

        rowImgs.forEach((img, i) => {
          const item = document.createElement("div");
          item.className = "jc-item";

          // set explicit width/height on img element (prevents layout jumps)
          const imgel = document.createElement("img");
          imgel.src = img.url;
          imgel.alt = "";
          imgel.width = Math.round(finalWidths[i]);
          imgel.height = Math.round(finalHeights[i]);
          imgel.style.display = "block";
          imgel.style.width = `${finalWidths[i]}px`; // enforce pixel size
          imgel.style.height = `${finalHeights[i]}px`;
          imgel.style.objectFit = "cover"; // or contain if you prefer no crop
          // NOTE: use cover for "full cell" look; change to contain to show entire image with possible background
          item.appendChild(imgel);
          row.appendChild(item);
        });

        el.appendChild(row);
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [images, perRow, gap, desiredHeightMultiplier]);

  return <div className="jc-container" ref={containerRef} />;
}
