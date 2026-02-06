import axios from "axios";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BASE_URL } from "../utils/constants";
import { Spinner } from "../components/ui/spinner";
import { toast } from "sonner";
import { MapPin, Mars, VenusAndMars } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const CardUser = ({ data }) => {
  const {
    _id,
    ProfileImage,
    firstName,
    lastName,
    age,
    gender,
    location,
    about,
  } = data;


   // sent request logic
  const queryClient = useQueryClient();
  const {mutate, isError, isPending, isSuccess} = useMutation({
    mutationFn: async (id)=>{
      await axios.post(
        BASE_URL + `/user/requested/${id}`,{},{withCredentials: true},
      );
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['feed']})
       toast.success("Request sent successfully!", {
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
  const handleSendRequest = ()=>{
    mutate(_id)
  }
  // const handleSendRequest = async () => {
  //   try {
  //     setPending(true);
  //     await axios.post(
  //       BASE_URL + `/user/requested/${_id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     setPending(false);
  //     setSent(true);
  //     toast.success("Request sent successfully!", {
  //       position: "top-right",
  //       style: {
  //         background: "black",
  //         color: "#ffff",
  //         borderRadius: "5px",
  //         fontSize: "12px",
  //         width: "250px",
  //         height: "40px",
  //         border:'none',
  //         boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //       },
  //     });
  //   } catch (err) {
  //     setPending(false);
  //     setError("* " + err.response.data.message);
  //     console.log(err);
  //   }
  // };


  return (
    <>
      <Card className="flex flex-col cursor-pointer bg-black min-w-100 max-w-100 border border-white/50 shadow-[10px_10px_500px_rgba(10,10,50,0.35)]">
        <div className="flex items-center pl-4">
          <img
            src={ProfileImage}
            alt="Event cover"
            className=" w-15 h-15 object-fit rounded-full"
          />
          <CardHeader className='-ml-2'>
            <CardTitle className="w-60 text-xl text-white font-semibold">
              {firstName + " " + lastName}
            </CardTitle>
            <div className="text-white flex -mt-2 gap-x-2 items-center">
              <p className="flex items-center text-[13px]" title="Gender"><Mars size={14} color="purple" style={{marginRight: '4px'}}/> {gender}</p>
              <p className="flex items-center text-[13px]" title="Age"><VenusAndMars size={14} color="purple" style={{marginRight: '2px'}}/> {age}</p>
              <p className="flex items-center text-[13px]" title="Location"><MapPin size={12} color="purple" style={{marginRight: '2px'}}/> {location}</p>
            </div>
          </CardHeader>
        </div>
        <CardContent>
          <CardDescription className="text-gray-300 pl-2">{about.length >130 ? about.slice(0,130) + "... more": about}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isSuccess || isError}
            className="w-full bg-gray-800 text-white cursor-pointer hover:bg-gray-900 hover:scale-102"
            onClick={handleSendRequest}
          >
            {isPending ? (
              <Spinner />
            ) : isSuccess ? (
              "Sent Successfully!"
            ) : isError ? (
              <p className="text-red-700">Failed to send!</p>
            ) : (
              "Send request"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
