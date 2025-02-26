import Logo from "@/components/Logo";
import SearchProduct from "@/components/SearchProduct";
import SearchResults from "@/components/SearchResults";

export default function Home() {
  return (
    <>
      <div className="grid gap-2 md:gap-8 justify-items-center">
        <Logo size="lg" className="w-3/5 md:w-96" />
        <SearchProduct />
        <SearchResults />
      </div>
    </>
  );
}
