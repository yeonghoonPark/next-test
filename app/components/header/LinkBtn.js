"use client";

import { useRouter } from "next/navigation";

export default function LinkBtn({ href, children }) {
  const router = useRouter();
  const onHandleBtn = () => {
    router.push(href);
  };
  return (
    <button type='text' onClick={onHandleBtn}>
      {children}
    </button>
  );
}
