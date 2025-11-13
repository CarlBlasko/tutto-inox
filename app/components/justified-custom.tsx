"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyboard } from "../hooks/use-keyboard";

type Img = {
  _id: string;
  url: string;
  width: number;
  height: number;
};

type LayoutImg = Img & { displayWidth: number; displayHeight: number };

export default function JustifiedGallery({
  images,
  desiredHeightMultiplier = 1.0,
}: {
  images: Img[];
  desiredHeightMultiplier?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<LayoutImg[]>([]);
  const [perRow, setPerRow] = useState(3);

  const handleIncrease = useCallback(
    () => setPerRow((p) => Math.max(p - 1, 1)),
    []
  );
  const handleDecrease = useCallback(() => setPerRow((p) => p + 1), []);

  useKeyboard({ key: "+", handleKeyboardShortcut: handleIncrease });
  useKeyboard({ key: "-", handleKeyboardShortcut: handleDecrease });

  const gap = 12;

  const computeLayout = (containerWidth: number) => {
    const rows: Img[][] = [];
    for (let i = 0; i < images.length; i += perRow) {
      rows.push(images.slice(i, i + perRow));
    }

    const layout: LayoutImg[] = [];

    rows.forEach((rowImgs) => {
      const desiredHeights = rowImgs.map(
        (img) => img.height * desiredHeightMultiplier
      );
      const ratios = rowImgs.map((img) => img.width / img.height);
      const desiredWidths = desiredHeights.map((h, i) => h * ratios[i]);

      const totalDesiredWidth = desiredWidths.reduce((s, w) => s + w, 0);
      const totalGap = gap * (rowImgs.length - 1);
      const availableWidth = Math.max(containerWidth - totalGap, 1);

      // scale so row fills availableWidth
      const scale =
        totalDesiredWidth > 0 ? availableWidth / totalDesiredWidth : 1;

      const finalHeights = desiredHeights.map((h) => h * scale);
      const finalWidths = finalHeights.map((h, i) => h * ratios[i]);

      rowImgs.forEach((img, i) => {
        layout.push({
          ...img,
          displayWidth: finalWidths[i],
          displayHeight: finalHeights[i],
        });
      });
    });

    return layout;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const containerWidth = el.clientWidth;
      const nextLayout = computeLayout(containerWidth);
      setLayout(nextLayout);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);

    return () => ro.disconnect();
  }, [images, perRow, gap, desiredHeightMultiplier]);

  return (
    <>
      <div className="box box--buttons">
        <button type="button" disabled={perRow < 2}>
          <img
            src="/images/plus.svg"
            alt="Plus"
            width={46}
            height={43}
            onClick={() => setPerRow(perRow - 1)}
          />
        </button>
        <button type="button" disabled={perRow === images.length}>
          <img
            src="/images/minus.svg"
            alt="Minus"
            width={46}
            height={43}
            onClick={() => setPerRow(perRow + 1)}
          />
        </button>
      </div>
      <div
        className="jc-container"
        ref={containerRef}
        style={{
          gap: `${gap}px`,
        }}
      >
        <AnimatePresence mode="popLayout">
          {layout.map((img) => (
            <motion.img
              key={img.url}
              src={img.url}
              layout
              transition={{ type: "spring", stiffness: 1000, damping: 100 }}
              style={{
                width: `${img.displayWidth}px`,
                height: `${img.displayHeight}px`,
                objectFit: "cover",
                display: "block",
              }}
              alt=""
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
