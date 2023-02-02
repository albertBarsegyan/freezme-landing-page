import { CSSProperties, useState } from "react";
import classNames from "classnames";
import styles from "./ImageLoader.module.css";
import Image, { StaticImageData } from "next/image";

export const enum ImgLoadState {
  Idle = "Idle",
  Loading = "Loading",
  Success = "Success",
}

export function ImageLoader({
  placeholderSrc,
  width,
  height,
  style,
  src,
  fill,
  className,
  alt,
  priority,
  unoptimized,
}: {
  width?: number;
  height?: number;
  className?: string;
  placeholderSrc?: string;
  src: string | StaticImageData | any;
  fill?: boolean;
  style?: CSSProperties;
  alt: string;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  const [imgData, setImgData] = useState({
    img: placeholderSrc || src,
    loadState: ImgLoadState.Loading,
  });

  const handleLoad = () => {
    setImgData((prev) => ({ ...prev, loadState: ImgLoadState.Success }));
  };

  const imageStyles = classNames({
    [styles.imageSuccess]: imgData.loadState === ImgLoadState.Success,
    [styles.imageLoading]: imgData.loadState === ImgLoadState.Loading,
    [className ?? ""]: Boolean(className),
  });

  return (
    <Image
      priority={priority}
      onLoad={handleLoad}
      fill={fill}
      width={width ?? 200}
      height={height ?? 200}
      style={style}
      unoptimized={unoptimized}
      className={imageStyles}
      src={src ?? ""}
      alt={alt}
    />
  );
}
