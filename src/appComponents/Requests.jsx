import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
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
import { addFriend } from '../utils/friendsSlice';


export const Requests = () => {

  const dispatch = useDispatch();
  const store = useSelector((store) => store.request);

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

  useEffect(() => {
    if (!store) {
      fetchRequests();
    }
  }, []);

  const handleAccept = async (id, accepted)=>{
    try{
      const accept = await axios.post(BASE_URL + `/requests/${accepted}/${id}`, {}, {
        withCredentials:true
      });
      console.log(accept)
      dispatch(addFriend(accept))
    }
    catch(err){
      console.log(err);
    }
  }

  const handleReject = async (id, rejected)=>{
    try{
      const reject = await axios.post(BASE_URL + `/requests/${rejected}/${id}`);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        {store?.map((request) => {
          return (
            <>
              <Card className="relative mx-auto w-full max-w-sm pt-0">
                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                <img
                  src={request?.ProfileImage}
                  alt="Event cover"
                  className="relative z-20 aspect-video w-full object-cover"
                />
                <CardHeader>
                  <CardTitle>
                    {request?.firstName + " " + request?.lastName}
                  </CardTitle>
                  <CardDescription>{request?.about}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p>{request?.gender}</p>
                    <p>{request?.age}</p>
                    <p>{request?.location}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={()=> handleAccept(request?._id, 'accepted')}>Accept</Button>
                  <Button onClick={()=> handleReject(request?._id, 'rejected')}>Reject</Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};
