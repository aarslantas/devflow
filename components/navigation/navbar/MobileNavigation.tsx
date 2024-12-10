import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "lucide-react";
import Image from "next/image";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <Image
        src="/icons/hamburger.svg"
        width={36}
        height={36}
        alt="Menu"
        className="invert-colors sm:hidden"
      />
      <SheetContent
        side="left"
        className="background-light900_dark200"
      >
        <SheetTitle className="hidden">
          Navigation
        </SheetTitle>
        <Link
          href="/"
          className="flex items-center gap-1"
        >
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
