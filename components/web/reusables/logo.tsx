import Image from "next/image";

interface LogoProps {
  src: string;
  alt?: string;
}

export default function Logo({ src, alt = "Fastdrop Logo" }: LogoProps) {
  return (
    <div className="ms-[-10px] flex items-center">
      <Image
        src={src}
        alt={alt}
        width={45}
        height={45}
        className="object-contain"
        priority
      />
      <span className="font-semibold font-dm-sans text-base sm:text-lg md:text-xl lg:text-xl">
        Fastdrop
      </span>
    </div>
  );
}
