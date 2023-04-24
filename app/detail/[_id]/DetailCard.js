"use client";

import { useRouter } from "next/navigation";

export default function DetailCard({ data }) {
  const router = useRouter();

  const onHandleEditBtn = (_id) => {
    router.push(`/edit/${_id}`);
  };

  const onHandleDeleteBtn = () => {
    console.log("[onHandleDeleteBtn]");
  };

  const onHandleBackBtn = () => {
    router.back(-1);
  };

  return (
    <div className='card'>
      <div>
        <h4>Author </h4>
        <p>{data.author}</p>
      </div>

      <hr />

      <div>
        <h4>Title </h4>
        <p>{data.title}</p>
      </div>

      <hr />

      <div>
        <h4>Content </h4>
        <p>{data.content}</p>
      </div>

      <div className='btn-group'>
        <button
          className='btn-small'
          type='text'
          onClick={() => onHandleEditBtn(data?._id)}
        >
          Edit
        </button>
        <button
          className='btn-small'
          type='text'
          onClick={() => onHandleDeleteBtn()}
        >
          Delete
        </button>
        <button
          className='btn-small'
          type='text'
          onClick={() => onHandleBackBtn()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
