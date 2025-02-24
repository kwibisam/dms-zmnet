import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function ZamnetLogo({className=""}) {
  return (
    <div
      className={`${lusitana.className} flex flex-row justify-center items-center leading-none text-white px-4 py-1 rounded-md ${className}`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-[36px] uppercase">Zamnet</p>
    </div>
  );
}