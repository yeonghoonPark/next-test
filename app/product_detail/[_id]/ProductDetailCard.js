"use client";

export default function ProductDetailCard({ data }) {
  return (
    <div className='card'>
      <div>
        <img src={data.image_src} alt={data.name} />
      </div>

      <div>
        <h4>{data.name}</h4>
        <p>{data.description}</p>
        <p>{data.price} 원</p>
      </div>

      <div className='btn-group'>
        <button className='btn-small' type='text'>
          🛒 장바구니
        </button>
        <button className='btn-small' type='text'>
          🤍 찜하기
        </button>
        <button className='btn-small' type='text'>
          구매하기
        </button>
      </div>
    </div>
  );
}
