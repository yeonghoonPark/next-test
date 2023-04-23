"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function WriteFrom({ author, email }) {
  const router = useRouter();

  const [titleVal, setTitleVal] = useState("");
  const [contentVal, setContentVal] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const checkEmptyString = () => {
    if (titleVal === "") {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (contentVal === "") {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    checkEmptyString();

    fetch("/api/write/insert", {
      method: "POST",
      body: JSON.stringify({
        title: titleVal,
        content: contentVal,
        author: author,
        email: email,
      }),
    })
      .then(() => {
        alert("글 등록이 완료되었습니다.");
        router.push("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          value={titleVal}
          ref={titleRef}
          onChange={(e) => setTitleVal(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          type='text'
          value={contentVal}
          ref={contentRef}
          onChange={(e) => setContentVal(e.target.value)}
        />
      </div>
      <button className='btn-large' type='submit' onSubmit={onHandleSubmit}>
        Confirm
      </button>
    </form>
  );
}
