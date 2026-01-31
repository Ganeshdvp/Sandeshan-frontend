import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Spinner } from '../components/ui/spinner';


export const Requests = () => {

  const dispatch = useDispatch();
  const store = useSelector((store) => store.request);

  const [acceptLoading, setAcceptLoading] = useState("");
  const [rejectLoading, setRejectLoading] = useState("");

  // fetch requests
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(requests.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

   // handle accept
  const handleAccept = async (id, accepted)=>{
    try{
      setAcceptLoading(id)
      await axios.post(BASE_URL + `/requests/${accepted}/${id}`, {}, {
        withCredentials:true
      });
      setAcceptLoading("")
    }
    catch(err){
      setAcceptLoading("")
      console.log(err);
    }
  }

// handle reject
  const handleReject = async (id, rejected)=>{
    try{
      setRejectLoading(id)
        await axios.post(BASE_URL + `/requests/${rejected}/${id}`, {}, {
        withCredentials: true
      });
      setRejectLoading("")
    }
    catch(err){
      setRejectLoading("")
      console.log(err);
    }
  }

  useEffect(() => {
    if (!store) {
      fetchRequests();
    }
  }, []);


  return (
    <>
      <div className="flex flex-wrap gap-y-8 mt-12 w-full p-6">
        {store?.map((request) => {
          return (
            <>
              <Card className="relative mx-auto w-75 max-w-sm pt-0 bg-purple-800 border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)] hover:scale-102 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
transition-shadow duration-300 cursor-pointer">
                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                <img
                  src={request?.ProfileImage}
                  alt="Event cover"
                  className="relative z-20 aspect-video w-full object-cover rounded-2xl"
                />
                <CardHeader>
                  <CardTitle className="-mt-2 text-xl text-white font-semibold">
                    {request?.firstName + " " + request?.lastName}
                  </CardTitle>
                  <CardDescription className='text-gray-300'>{request?.about}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-white">
                    <p>{request?.gender}</p>
                    <p>{request?.age}</p>
                    <p>{request?.location}</p>
                  </div>
                </CardContent>
                <CardFooter className='flex items-center gap-x-2 justify-end'>
                  <Button className=' bg-purple-950 cursor-pointer' onClick={()=> handleAccept(request?._id, 'accepted')}>{acceptLoading === request._id ? <Spinner/> : "Accept"}</Button>
                  <Button className='bg-transparent border cursor-pointer hover:bg-gray-300 hover:text-black' onClick={()=> handleReject(request?._id, 'rejected')}>{rejectLoading === request._id ? <Spinner/> : "Reject"}</Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};
