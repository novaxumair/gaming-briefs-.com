import Image, { type ImageProps } from "next/image";
import { isSatanoRemoteImage } from "@/lib/gameplay-images";

/** Satano CDN blocks hotlinks unless referrer is stripped. */
export default function SatanoImage({
  src,
  unoptimized,
  priority,
  loading,
  ...props
}: ImageProps) {
  const remote = typeof src === "string" && isSatanoRemoteImage(src);

  return (
    <Image
      {...props}
      src={src}
      referrerPolicy="no-referrer"
      unoptimized={remote || unoptimized}
      priority={priority}
      loading={priority ? undefined : loading ?? "lazy"}
    />
  );
}
