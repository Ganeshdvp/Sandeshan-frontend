import {
  Card,

  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Edit2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

export const Profile = () => {
  const store = useSelector((store) => store?.user);

  return (
    <>
      <Card className="w-full max-w-2xl bg-gray-950 border-0 text-white mx-auto">
        <CardHeader className="text-center text-2xl">
          {/* <CardTitle>Profile</CardTitle> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <img
                  src={store?.bgImage}
                  alt="bg-image"
                  className="rounded-xl w-full h-70 object-cover"
                />
              </div>
              <div className="grid gap-2 relative -top-25">
                <div className="flex justify-between">
                  <Avatar className="w-35 h-35">
                  <AvatarImage src={store?.ProfileImage} alt="profile-image" />
                  <AvatarFallback>Profile Image</AvatarFallback>
                </Avatar>
                <Link to='/profile/edit'>
                <p className="m-8 mt-20 rounded-sm p-2 flex items-center gap-x-1 cursor-pointer"><Edit2Icon size={14}/> Edit</p>
                </Link>
                </div>
              </div>
              <div className="grid gap-2 -mt-26">
                <Label className='font-light'>About</Label>
                <strong>{store?.about}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>First Name</Label>
                <strong>{store?.firstName}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>Last Name</Label>
                <strong>{store?.lastName}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>Email</Label>
                <strong>{store?.emailId}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>Age</Label>
                <strong>{store?.age}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>Gender</Label>
                <strong>{store?.gender}</strong>
              </div>
              <div className="grid gap-2">
                <Label className='font-light'>Location</Label>
                <strong>{store?.location}</strong>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Outlet/>
    </>
  );
};
