import Navbar from "@/components/navigation/navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import React from "react";
import RightSidebar from "@/components/navigation/RightSidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div>
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
