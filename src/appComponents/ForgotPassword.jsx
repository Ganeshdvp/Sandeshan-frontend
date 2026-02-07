import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Spinner } from "../components/ui/spinner";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const ForgotPassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate()

  // forgot password
  const {mutate, isPending, error} = useMutation({
    mutationFn: async (password)=>{
      await axios.patch(BASE_URL + '/profile/forgot-password', {password : password}, {
        withCredentials:true
      });
      navigate(-1);
        toast.success("Password was updated successfully!", {
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
    }
  })
  const forgotPassword = ()=>{
    if(!newPassword.trim()) return;
    mutate(newPassword)
  }

  // cancel button
  const handleCancel = ()=>{
    navigate(-1);
  }

   // const forgotPassword = async ()=>{
  //   try{
  //     if(!newPassword.trim()) return;
  //     setLoading(true);
  //     await axios.patch(BASE_URL + '/profile/forgot-password', {password : newPassword}, {
  //       withCredentials:true
  //     });
  //     setLoading(false);
  //     navigate(-1);
  //   }
  //   catch(err){
  //     setLoading(false);
  //     setError(err.response.data.message);
  //     console.log(err);
  //   }
  // }

  return (
    <>
    <div className="absolute w-full h-full inset-1 bg-black/80 top-0 left-0 right-0 bottom-0">
       <Card value={newPassword} onValueChange={setNewPassword} className="w-full max-w-sm sm:max-w-md h-85 mx-auto mt-30 bg-white border-0 shadow-[0_0_22px_rgba(255,255,255,0.35)]">
        <CardHeader className='text-center mb-6'>
          <CardTitle className='text-2xl text-black'>Create Your Password</CardTitle>
          <CardDescription  className='text-gray-500'>
             "Enter your new Password below to login to your account"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
                    <div className="grid gap-2 text-black">
                <Label htmlFor="firstName">New Password</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your password"
                  required
                  value={newPassword}
                  onChange = {e=> setNewPassword(e.target.value)}
                />
              </div>
              <p className="text-red-700 text-[12px] -mt-4">{error?.response?.data?.message}</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button disabled={isPending} type="submit" className="w-40 mt-2 bg-gray-700 cursor-pointer hover:bg-gray-900 hover:scale-102" onClick={forgotPassword}>
           {isPending ? <Spinner/> : "Submit"}
          </Button>
          <CardAction>
            <Button onClick={handleCancel} className="cursor-pointer text-[12px] text-black ml-33 sm:ml-42 -mt-2" variant="link">Cancel</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
