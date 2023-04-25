"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ data, session }) {
  const router = useRouter();

  const [titleVal, setTitleVal] = useState("");
  const [contentVal, setContentVal] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    setTitleVal(data.title);
    setContentVal(data.content);
    titleRef.current.focus();
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (titleVal === "") {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (contentVal === "") {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    }

    fetch("/api/notice/edit/update", {
      method: "PUT",
      body: JSON.stringify({
        _id: data?._id,
        title: titleVal,
        content: contentVal,
        email: data?.email,
        role: session.user?.role,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        res.success === true && router.push("/notice");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor='_id'>_id</label>
        <input id='_id' defaultValue={data._id} />
      </div>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          value={titleVal}
          ref={titleRef}
          onChange={(e) => setTitleVal(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
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
