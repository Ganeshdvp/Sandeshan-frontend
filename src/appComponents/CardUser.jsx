import axios from "axios";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BASE_URL } from '../utils/constants';
import { useState } from "react";
import { Spinner } from '../components/ui/spinner';
import { toast } from "sonner"

export const CardUser = ({data}) => {

    const {_id, ProfileImage, firstName, lastName, age, gender, location, about} = data

    const [pending, setPending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("")

    // sent request logic
    const handleSendRequest = async ()=>{
      try{
        setPending(true);
        await axios.post(BASE_URL + `/user/requested/${_id}`, {}, {
          withCredentials: true
        });
        setPending(false);
        setSent(true);
        toast.success("Request sent successfully!", {
                    position: "top-right",
                    style:{
                      background:'#8B00E7',
                      color:'#ffff',
                      borderRadius:'5px',
                      fontSize:'12px',
                      width: "250px",
                      height:'40px',
                      border: 'none',
                      boxShadow:'0 10px 22px rgba(168,85,247,0.35)'
                    }
                  });
      }
      catch(err){
        setPending(false);
        setError("* " + err.response.data.message)
        console.log(err);
      }
    }

    
  return (
    <>
    <Card className="relative mx-auto w-75 max-w-sm pt-0 bg-purple-800 border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)] hover:scale-102 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
transition-shadow duration-300 cursor-pointer">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={ProfileImage}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover rounded-2xl"
      />
      <CardHeader>
        <CardTitle className='-mt-2 text-xl text-white font-semibold'>{firstName + ' ' + lastName}</CardTitle>
        <CardDescription className='text-gray-300'>
          {about}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-white">
          <p><span >Gender : </span>{gender}</p>
          <p><span>Age : </span> {age}</p>
          <p><span>Location : </span>{location}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={sent || error} className="w-full bg-purple-950 cursor-pointer" onClick={handleSendRequest}>
          {pending ? <Spinner/> : (sent ? "Sent Successfully!" : (error? <p className="text-red-700">Failed to send!</p> : "Send request"))}
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
