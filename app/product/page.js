import ProductCard from "./ProductCard";

export default function ProductPage() {
  return (
    <div className='container product-page'>
      <h1 className='page-title'>Product</h1>
      <div className='card-container'>
        <ProductCard />
      </div>
    </div>
  );
}
