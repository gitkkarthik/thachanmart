import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#1f5916] text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Wrap Link with an <a> tag */}
        <Link href="/" className="text-xl font-bold">
          <span>Thachan Mart</span>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/products" className="hover:text-gray-400">Products</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
          <Link href="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;