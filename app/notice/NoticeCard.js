"use client";

// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NoticeCard({ data }) {
  const router = useRouter();
  // const [notice, setNotice] = useState([]);

  // useEffect(() => {
  //   fetch("/api/notice/get", { method: "GET" })
  //     .then((res) => res.json())
  //     .then((res) => setNotice(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const onClickCard = (_id) => {
    router.push(`/detail/${_id}`);
  };

  const renderHTML = () => {
    return data.map((cV) => {
      return (
        <div className='card' key={cV._id} onClick={() => onClickCard(cV._id)}>
          <h4>{cV.title}</h4>
          <p>{cV.author}</p>
        </div>
      );
    });
  };

  return <>{renderHTML()}</>;
}
