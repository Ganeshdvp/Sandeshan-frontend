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

export const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate()

  // forgot password
  const forgotPassword = async ()=>{
    try{
      if(!newPassword.trim()) return;
      setLoading(true);
      await axios.patch(BASE_URL + '/profile/forgot-password', {password : newPassword}, {
        withCredentials:true
      });
      setLoading(false);
      navigate(-1);
    }
    catch(err){
      setLoading(false);
      setError(err.response.data.message);
      console.log(err);
    }
  }

  // cancel button
  const handleCancel = ()=>{
    navigate(-1);
  }

  return (
    <>
    <div className="absolute w-full h-full inset-1 bg-black/80 top-0 left-0 right-0 bottom-0">
       <Card value={newPassword} onValueChange={setNewPassword} className="w-full max-w-md h-85 mx-auto mt-30 bg-purple-800 border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)]">
        <CardHeader className='text-center mb-6'>
          <CardTitle className='text-2xl text-white'>Create Your Password</CardTitle>
          <CardDescription  className='text-gray-300'>
             "Enter your new Password below to login to your account"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
                    <div className="grid gap-2 text-white">
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
              <p className="text-red-700 text-[12px] -mt-4">{error}</p>
              {/* <div className="grid gap-2 text-white">
                <Label htmlFor="lastName">Confirm Your Password</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div> */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button disabled={loading} type="submit" className="w-40 mt-2 bg-purple-950 cursor-pointer hover:bg-purple-900" onClick={forgotPassword}>
           {loading ? <Spinner/> : "Submit"}
          </Button>
          <CardAction>
            <Button onClick={handleCancel} className="cursor-pointer text-[12px] text-white ml-42 -mt-2" variant="link">Cancel</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
