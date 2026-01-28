import { NavBar } from "./NavBar";
import { AppTabs } from './AppTabs';
import { Outlet } from "react-router";


export const Container = () => {
  return (
    <>
    <NavBar/>
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <AppTabs/>
      <Outlet/>
    </div>
    </>
  )
}
