import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { DropDown } from "./DropDown";
import { AppTabs } from "./AppTabs";

export const NavBar = () => {

  const store = useSelector(store=> store?.user);

  return (
    <>
      <div className="flex justify-between p-8 bg-black">
        <h1 className="text-white font-bold text-2xl">SANDESHAN</h1>
        <AppTabs/>
       {
        store && (
           <div className="flex gap-x-6 items-center">
          <p className="text-white">Welcome! <span className="text-purple-700">{store?.firstName}</span></p>
          <DropDown>
            <Avatar className='cursor-pointer'size='lg'>
          <AvatarImage src={store?.ProfileImage} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
          </DropDown>
        </div>
        )
       }
      </div>
    </>
  );
};
