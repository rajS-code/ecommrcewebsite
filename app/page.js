import Navbar from "@/components/navbar";
import Category from "@/components/category";
import Herobanner from "@/components/herobanner";

export default function Home() {
  const categorys = [
    { name: "Electronics", image: "/electronics.jpg" },
    { name: "Fashion", image: "/fashion.jpg" },
    { name: "Home & Kitchen", image: "/home_kitchen.jpg" },
    { name: "Beauty & Personal Care", image: "/beauty.jpg" },
  ];

  return (
    <>
    <nav>
      <Navbar />
    </nav>
      <main className="w-screen h-auto flex-col flex">
        <Herobanner />
        <Category />
      </main>
    </>
  );
}
