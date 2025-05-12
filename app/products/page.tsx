import Products from "../components/Products"; // ✅ Unique name
import ProductCarousel from "../components/ProductCarousel"; // ✅ Unique name
//import ProductGrid from "../components/ProductGrid"; // ✅ Unique name

export default function ProductsPage() {
  return (
    <div>
      <Products />    
      <ProductCarousel />
      {/*<ProductGrid />*/}
    </div>
  );
}
