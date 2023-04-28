"use client";

export default function Error({ reset }) {
  return (
    <div className='error-page'>
      <h3 className='page-title'>
        네트워크 오류로 페이지를 불러오는데 실패하였습니다.
      </h3>

      <button className='btn-small' type='text' onClick={() => reset()}>
        리셋
      </button>
    </div>
  );
}
