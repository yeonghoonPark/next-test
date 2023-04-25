"use client";

import { useRouter } from "next/navigation";

export default function DetailCard({ data, session }) {
  const router = useRouter();

  const onHandleEditBtn = (_id) => {
    router.push(`/edit/${_id}`);
  };

  const onHandleDeleteBtn = async (_id) => {
    const question = confirm(
      "한번 삭제한 자료는 복구 할 수 없습니다, 그래도 삭제하시겠습니까?",
    );
    if (question) {
      try {
        const res = await fetch("/api/notice/delete", {
          method: "DELETE",
          body: JSON.stringify({
            _id: _id,
            email: data?.email,
            role: session.user?.role,
          }),
        });

        const json = await res.json();
        alert(json.data);
        json.success === true && router.push("/notice");
      } catch (err) {
        console.error(err);
      }
    }
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
          onClick={() => onHandleDeleteBtn(data?._id)}
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
