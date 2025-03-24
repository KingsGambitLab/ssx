import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex items-center pl-[45px] rounded-[8px] border border-neutral-gray-50 bg-white">
      <div className="flex flex-col items-start gap-[12px] py-[42px]">
        <div className="text-[#171717] text-[32px] font-semibold">
          Welcome to Student Directory of {' '}
          <span
            className="text-[32px] font-semibold leading-[140%] text-transparent"
            style={{
              backgroundImage: 'linear-gradient(93deg, #171717 -1.36%, #0052FF 57.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Scaler School of Technology
          </span>
        </div>
        <div className="text-[#616161] text-2xl font-normal">
          Connect with the Students to learn more about SST
        </div>
      </div>
      <Image
        src="/images/sst/webp/sst-banner.webp"
        alt="school of Technology banner"
        width={690}
        height={300}
        className="w-[690px] h-[300px]"
      />
    </div>
  )
}