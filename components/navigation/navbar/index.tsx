import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggleButton";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className=" fixed z-50 flex-between background-light900_dark200  w-full p-6 shadow-light-300 sm:px-12 dark:shadow-none gap-5">
      <Link
        href="/"
        className="flex items-center gap-1"
      >
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev{" "}
          <span className="text-primary-500">
            Flow
          </span>
        </p>
      </Link>
      <p>global Search</p>
      <div className="flex-between gap-5">
        <ThemeToggle />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;