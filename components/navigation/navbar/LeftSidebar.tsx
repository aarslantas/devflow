import React from "react";
import NavLinks from "./NavLinks";

const LeftSidebar = () => {
  return (
    <section className="custom-scrolbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-8">
        <NavLinks />
      </div>
    </section>
  );
};

export default LeftSidebar;
