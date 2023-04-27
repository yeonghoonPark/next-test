"use client";

// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductCard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/product/get", { method: "GET" });
      const json = await res.json();
      setProducts(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onClickCard = (_id) => {
    router.push(`/product_detail/${_id}`);
  };

  const renderHTML = () => {
    return products.map((cV) => {
      return (
        <div className='card' key={cV._id} onClick={() => onClickCard(cV._id)}>
          <div>
            <h4>{cV.name}</h4>
            <p>{cV.description}</p>
            <p>{cV.price} 원</p>
          </div>
          <div>
            <img src={`/images/product_${cV.product_num}.jpg`} alt={cV.name} />
          </div>
        </div>
      );
    });
  };

  return <>{renderHTML()}</>;
}
