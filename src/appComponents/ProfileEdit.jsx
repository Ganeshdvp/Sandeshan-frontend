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
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { toast } from 'sonner';
import { Spinner } from '../components/ui/spinner';
import { useMutation } from "@tanstack/react-query";


export const ProfileEdit = () => {

  const store = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

// edit data feilds
  const [firstName, setFirstName] = useState(`${store?.firstName}`);
  const [lastName, setLastName] = useState(`${store?.lastName}`);
  const [age, setAge] = useState(`${store?.age}`);
  const [gender, setGender] = useState(`${store?.gender}`);
  const [location, setLocation] = useState(`${store?.location}`);
  const [profileImage, setProfileImage] = useState(`${store?.ProfileImage}`);
  const [bgImage, setBgImage] = useState(`${store?.bgImage}`);
  const [about, setAbout] = useState(`${store?.about}`);

  const [open, setOpen] = useState(true);

  // save changes logic
  const {mutate, isPending, error} = useMutation({
    mutationFn: async (edit)=>{
         const editData = await axios.patch(BASE_URL + '/profile/edit', edit, {
        withCredentials: true
      });
      dispatch(addUser(editData.data.data));
      setOpen(false)
      navigate('/main/profile');
       toast.success("Profile was updated successfully!", {
        position: "top-right",
        style: {
          background: "black",
          color: "#ffff",
          borderRadius: "5px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
            border:'none',
          boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
        },
      });
    },
  })
  const handleSaveChanges = ()=>{
    mutate({
      firstName,
        lastName,
        age,
        gender,
        location,
        about,
        ProfileImage: profileImage,
        bgImage: bgImage
    })
  }
  // const handleSaveChanges = async ()=>{
  //   try{
  //     setLoading(true);
  //     const edit = {
  //       firstName,
  //       lastName,
  //       age,
  //       gender,
  //       location,
  //       about,
  //       ProfileImage: profileImage,
  //       bgImage: bgImage
  //     }
  //     const editData = await axios.patch(BASE_URL + '/profile/edit', edit, {
  //       withCredentials: true
  //     })
  //     dispatch(addUser(editData.data.data));
  //     setLoading(false)
  //     setOpen(false);
  //     toast.success("Profile was updated successfully!", {
  //                   position: "top-right",
  //                   style:{
  //                     background:'#8B00E7',
  //                     color:'#ffff',
  //                     borderRadius:'5px',
  //                     fontSize:'12px',
  //                     width: "250px",
  //                     height:'40px',
  //                     border: 'none',
  //                     boxShadow:'0 10px 22px rgba(168,85,247,0.35)'
  //                   }
  //                 });
  //   }
  //   catch(err){
  //        setLoading(false);
  //        setError(err.response.data.message)
  //     console.log(err)
  //   }
  // }

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={() => {
          navigate(-1);
        }}
      >
        <SheetContent className='overflow-y-auto bg-black text-white border-0 shadow-[0_0_22px_rgba(255,255,255,0.35)] hover:scale-102 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)]
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
            </div>
            <div className="grid gap-3">
              <Avatar className="w-35 h-35 absolute top-60 left-[30%]">
                <AvatarImage src={store?.ProfileImage} alt="profile-image" />
                <AvatarFallback>Profile Image</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-3 mt-12">
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
                <Link to='/main/profile/forgot-password'><p className="text-[12px] underline cursor-pointer">Forgot password</p></Link>
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
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-profileImage">Profile Image</Label>
              <Input id="sheet-demo-location" type='text' value={profileImage} onChange={e=> setProfileImage(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-profileImage">Background Image</Label>
              <Input id="sheet-demo-location" type='text' value={bgImage} onChange={e=> setBgImage(e.target.value)} />
            </div>
          </div>
          <p className="text-red-700 text-[12px]">{error?.response?.data?.message}</p>
          <SheetFooter>
            <Button type="submit" onClick={handleSaveChanges} className='bg-gray-800 hover:bg-gray-900 cursor-pointer'>{isPending ? <Spinner/> : "Save Changes"}</Button>
            <SheetClose asChild>
              <Button variant="outline" className='cursor-pointer text-white bg-transparent border-0'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
