import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Edit2Icon, EditIcon } from "lucide-react";
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';


export const ProfileEdit = () => {

  const store = useSelector((store) => store?.user);
  const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(`${store?.firstName}`);
  const [lastName, setLastName] = useState(`${store?.lastName}`);
  const [age, setAge] = useState(`${store?.age}`);
  const [gender, setGender] = useState(`${store?.gender}`);
  const [location, setLocation] = useState(`${store?.location}`);
  const [profileImage, setProfileImage] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [about, setAbout] = useState(`${store?.about}`);

  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleSaveChanges = async ()=>{
    try{
      const edit = {
        firstName,
        lastName,
        age,
        gender,
        location,
        about
      }
      const editData = await axios.patch(BASE_URL + '/profile/edit', edit, {
        withCredentials: true
      })
      dispatch(addUser(editData.data.data));
      setOpen(false);
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={() => {
          navigate(-1);
        }}
      >
        <SheetContent className='overflow-y-auto bg-black text-white border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)] hover:scale-102 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
transition-shadow duration-300'>
          <SheetHeader>
            <SheetTitle className='text-white'>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <img src={store?.bgImage} alt="bg-image" className="rounded-2xl"/>
              <div
                className="relative -top-6 left-[90%] flex items-center justify-center
                  w-6 h-6 rounded-full bg-black/70 cursor-pointer
                  hover:bg-black transition"
              >
                <Edit2Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="grid gap-3">
              <Avatar className="w-35 h-35 absolute top-60 left-[30%]">
                <AvatarImage src={store?.ProfileImage} alt="profile-image" />
                <AvatarFallback>Profile Image</AvatarFallback>
              </Avatar>
              <div
                className="relative -top-6 left-50 flex items-center justify-center
                  w-6 h-6 rounded-full bg-black/70 cursor-pointer
                  hover:bg-black transition"
              >
                <EditIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-about">About</Label>
              <Input id="sheet-demo-about" type='text' value={about} onChange={e=> setAbout(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-firstName">First Name</Label>
              <Input id="sheet-demo-firstName" type='text' value={firstName} onChange={e=> setFirstName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-lastName">Last Name</Label>
              <Input id="sheet-demo-lastName" type='text' value={lastName} onChange={e=> setLastName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-gmail">Gmail</Label>
              <Input id="sheet-demo-gmail" type='email' disabled defaultValue={store?.emailId}/>
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="sheet-demo-password">Password</Label>
                <Link to='/profile/forgot-password'><p className="text-[12px] underline cursor-pointer">Forgot password</p></Link>
              </div>
              <Input
                id="sheet-demo-password"
                type="password"
                defaultValue="********"
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-age">Age</Label>
              <Input
                id="sheet-demo-age"
                type="number"
                value={age} onChange={e=> setAge(e.target.value)} 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-gender">Gender</Label>
              <Input
                id="sheet-demo-gender"
                type="type"
                value={gender} onChange={e=> setGender(e.target.value)} 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-location">Location</Label>
              <Input id="sheet-demo-location" type='text' value={location} onChange={e=> setLocation(e.target.value)} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" onClick={handleSaveChanges} className='bg-purple-900 hover:bg-purple-800 cursor-pointer'>Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline" className='cursor-pointer text-black bg-gray-600 border-0'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
