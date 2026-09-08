"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { CatalogItem } from "@/lib/data";

export default function ProductCard({ item, href }: { item: CatalogItem; href: string }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(true);
    window.setTimeout(() => setClicked(false), 420);
  }, []);

  const imageSrc = hovered && item.gif ? item.gif : item.image;

  return (
    <div
      className={`gyc-product-card relative w-full${clicked ? " gyc-product-card-clicked" : ""}`}
      data-product-card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="gyc-product-glow" />
      <div className="flex flex-col gap-2.5">
        <Link
          href={href}
          className="gyc-product-card-link block"
          onClick={handleClick}
        >
          <div className="gyc-product-frame">
            <div className="gyc-product-image-wrap">
              <Image
                src={imageSrc}
                alt={item.title}
                fill
                loading="lazy"
                className="gyc-product-image"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                unoptimized={
                  imageSrc.endsWith(".gif") ||
                  imageSrc.startsWith("http") ||
                  imageSrc.startsWith("/cs/")
                }
              />
            </div>
            <div className="gyc-product-shine" />
            <div className="gyc-product-click-flash" aria-hidden />
          </div>
          <p className="gyc-product-title">{item.title}</p>
        </Link>
      </div>
    </div>
  );
}
