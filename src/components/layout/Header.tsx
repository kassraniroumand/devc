import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-32 z-50 h-16 w-[calc(100%-8rem)] bg-[linear-gradient(to_left,_#029ade_0%,_#1f7ab5_35%,_#2269b0_60%,_#2269b0_100%)] text-white shadow transition-all duration-300 grid grid-cols-[1fr_auto_1fr] items-center">
      <h1 className="pl-4 font-semibold text-lg tracking-wider justify-self-start">
        DFT – National Transport Analysis Platform
      </h1>

      <Image
        src="/svg/logo.svg"
        alt="logo"
        width={48}
        height={48}
        className="h-[75%] justify-self-center"
      />

      {/* Right side space for future buttons */}
      <div className="justify-self-end pr-4"></div>
    </header>
  );
}
