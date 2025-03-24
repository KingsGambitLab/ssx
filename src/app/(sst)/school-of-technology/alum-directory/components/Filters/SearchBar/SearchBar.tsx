import Image from 'next/image';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <div className="flex gap-[24px] w-full">
      <div className="flex items-center justify-center px-[24px] py-[12px] gap-[4px]
      rounded-[8px] bg-[#171717]">
        <Image src="/images/sst/svg/funnel.svg" alt="Filter Icon" width={20} height={20} />
        <div className="text-white text-sm font-semibold">
          Filter
        </div>
      </div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by name, city, state or school"
          className={`flex items-between py-[12px] px-[24px] 
                      rounded-[8px] border border-[#E4E4E4] bg-[#F0F0F0]
                      ${styles.input} w-full text-black`}
        />
      </div>

    </div>
  )
}