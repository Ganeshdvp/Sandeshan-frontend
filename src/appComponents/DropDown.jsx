import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { removeFeed } from '../utils/feedSlice';
import { removeRequest } from '../utils/requestSlice';
import { removeFriend } from '../utils/friendsSlice';
import { removeBlock } from '../utils/blockSlice';

export const DropDown = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sign out logic
  const handleSignout = async () => {
    try {
      await axios.post(BASE_URL + "/signout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeRequest());
      dispatch(removeFeed());
      dispatch(removeFriend())
      dispatch(removeBlock())
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6 bg-purple-700 border-0">
          <Link to="/profile">
          <DropdownMenuItem className='text-white hover:bg-purple-800 cursor-pointer'>
              <UserIcon color="white"/>
              Profile
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='text-white hover:bg-purple-800 cursor-pointer'>
            <SettingsIcon color="white"/>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleSignout} className='cursor-pointer hover:bg-purple-800'>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
