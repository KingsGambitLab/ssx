import Navbar from "@/components/Sst/Navbar/Navbar";
import Banner from "./components/Banner";
import Filters from "./components/Filters/Filters";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start gap-[32px] py-[32px] px-[104px] bg-[#F5F5F5]">
        <Banner />
        {/* Filters */}
        <Filters />
      </div>
    </>
  )
}