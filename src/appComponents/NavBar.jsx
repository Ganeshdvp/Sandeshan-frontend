import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { DropDown } from "./DropDown";
import { AppTabs } from "./AppTabs";

export const NavBar = () => {
  const store = useSelector((store) => store?.user);

  return (
    <>
      <div className="flex-col flex justify-between md:flex-row md:justify-between p-8">
        <h1 className="-mt-20 text-white font-bold text-2xl md:mt-0 order-1">SANDESHAN</h1>
        <AppTabs />
        {store && (
          <div className="flex gap-x-2 items-center ml-[90%] -mt-8 md:ml-0 md:mt-0 order-2 md:order-3">
            <p className="text-white hidden md:block">
              Welcome!{" "}
              <span className="text-purple-700">{store?.firstName}</span>
            </p>
            <DropDown>
              <Avatar className="cursor-pointer" size="lg">
                <AvatarImage src={store?.ProfileImage} />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </DropDown>
          </div>
        )}
      </div>
    </>
  );
};
