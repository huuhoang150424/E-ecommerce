import { Header, SideBar } from "@/components/admin";
import { ThemeProvider} from "@/context/ThemeProvider";
import React, { useState } from "react"

interface Props {
  children?: React.ReactNode;

}



export default function AdminLayout({ children }: Props) {
  return (
    <ThemeProvider defaultTheme='light'>
      <div className="flex transition-all duration-500 ease-linear dark:bg-colorDarkMode ">
        <SideBar
          className="border-r-[1px] border-gray-300 h-[100vh] dark:border-borderDarkMode sticky left-0 top-0"
        />
        <div className={`w-full flex flex-col `}>
          <Header />
          <main className="px-[25px] py-[30px]">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
