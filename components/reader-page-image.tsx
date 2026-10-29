"use client";

import Image from "next/image";
import { useState } from "react";

type ReaderPageImageProps = {
  alt: string;
  preload?: boolean;
  src: string;
};

export function ReaderPageImage({ alt, preload = false, src }: ReaderPageImageProps) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  return (
    <div className="reader-image-frame">
      {failed ? (
        <div className="reader-image-error" role="alert">
          <p>โหลดภาพหน้านี้ไม่สำเร็จ</p>
          <button
            onClick={() => {
              setFailed(false);
              setAttempt((current) => current + 1);
            }}
            type="button"
          >
            ลองโหลดอีกครั้ง
          </button>
        </div>
      ) : (
        <Image
          alt={alt}
          className="reader-image"
          height={1280}
          key={attempt}
          onError={() => setFailed(true)}
          preload={preload}
          sizes="(max-width: 760px) 100vw, 760px"
          src={src}
          width={900}
        />
      )}
    </div>
  );
}
