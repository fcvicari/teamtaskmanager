import Image from "next/image";
import Logodevel from '../../../public/fcvicari.svg';

export function PublicFooter() {
  return (
    <footer className="flex justify-between pt-2 items-center w-full border-t-2 border-[hsl(var(--sessionBorder))] px-3 md:px-10 lg:px-20 bg-[hsl(var(--background02))] pb-2">
      <div className="flex flex-col">
        <span className="text-[0.75rem]">All rights reserved.</span>
        <span className="text-[0.75rem]">&copy; Team Task Manager. 2024</span>
      </div>
      <div className="flex flex-col items-center justify-center content-center">
        <span className="text-[0.75rem]">Developed by:</span>
        <Image alt="Developed by FCVicari Developer" src={Logodevel} />
      </div>
    </footer>
  )

}