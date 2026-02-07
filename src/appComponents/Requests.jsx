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
import { Spinner } from "../components/ui/spinner";
import { toast } from "sonner";
import { NotFound } from "./NotFound";
import { ShimmerUi} from './ShimmerUi';
import { MapPin, Mars, VenusAndMars } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const Requests = () => {

  const dispatch = useDispatch();
  const store = useSelector((store) => store.request);

  const [acceptLoading, setAcceptLoading] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(null);


  const queryClient = useQueryClient();

  // fetch requests
  const {data} = useQuery({
    queryKey: ['requests'],
    queryFn: async ()=>{
      const requests = await axios.get(BASE_URL + "/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(requests.data?.data));
    },
    retry: 2,
    refetchOnWindowFocus : false,
    gcTime: 1000*60*30,
  })
      useEffect(()=>{
        if(data){
          dispatch(addRequest(data))
        }
      },[data,dispatch]);

  // handle accept
   const {mutate:acceptMutate, isPending:acceptPending} = useMutation({
    mutationFn: async ({id,accepted})=>{
      await axios.post(
        BASE_URL + `/requests/${accepted}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
    },
    onSettled: ()=>{
      setAcceptLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success("Aceepted the request successfully!", {
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
   const handleAccept = (id,accepted)=>{
    setAcceptLoading(id);
    acceptMutate({id,accepted})
   }

  // handle reject
  const {mutate:rejectMutate, isPending:rejectPending} = useMutation({
    mutationFn: async ({id, rejected})=>{
      await axios.post(
        BASE_URL + `/requests/${rejected}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
    },
    onSettled: ()=>{
      setRejectLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success("Rejected the request successfully!", {
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
  const handleReject = (id, rejected)=>{
    setRejectLoading(id);
    rejectMutate({id, rejected})
  }

  // const fetchRequests = async () => {
  //   try {
  //     const requests = await axios.get(BASE_URL + "/requests", {
  //       withCredentials: true,
  //     });
  //     dispatch(addRequest(requests.data?.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleAccept = async (id, accepted) => {
  //   try {
  //     setAcceptLoading(id);
  //     await axios.post(
  //       BASE_URL + `/requests/${accepted}/${id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     setAcceptLoading("");
  //     toast.success("Aceepted the request successfully!", {
  //       position: "top-right",
  //       style: {
  //         background: "black",
  //         color: "#ffff",
  //         borderRadius: "5px",
  //         fontSize: "12px",
  //         width: "250px",
  //         height: "40px",
  //           border:'none',
  //         boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //       },
  //     });
  //   } catch (err) {
  //     setAcceptLoading("");
  //     console.log(err);
  //   }
  // };

  // const handleReject = async (id, rejected) => {
  //   try {
  //     setRejectLoading(id);
  //     await axios.post(
  //       BASE_URL + `/requests/${rejected}/${id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     setRejectLoading("");
  //     toast.success("Rejected the request successfully!", {
  //       position: "bottom-right",
  //       style: {
  //         background: "black",
  //         color: "#ffff",
  //         borderRadius: "5px",
  //         fontSize: "12px",
  //         width: "250px",
  //         height: "40px",
  //            border:'none',
  //         boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //       },
  //     });
  //   } catch (err) {
  //     setRejectLoading("");
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (!store) {
  //     fetchRequests();
  //   }
  // }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center mx-auto gap-x-6 gap-y-6 mt-12 w-full bg-black">
        {store?.length > 0 ? (
          store?.map((request) => {
            return (
              <>
                <Card
                  className="flex flex-col cursor-pointer bg-black min-w-90 sm:min-w-100 max-w-100 border border-white/50 shadow-[10px_10px_500px_rgba(10,10,50,0.35)]"
                >
                  <div className="flex items-center pl-4">
          <img
            src={request?.ProfileImage}
            alt="Event cover"
            className=" w-15 h-15 object-fit rounded-full"
          />
          <CardHeader className='-ml-2'>
            <CardTitle className="w-60 text-xl text-white font-semibold">
              {request?.firstName + " " + request?.lastName}
            </CardTitle>
            <div className="text-white flex -mt-2 gap-x-2 items-center">
              <p className="flex items-center text-[13px]" title="Gender"><Mars size={14} color="purple" style={{marginRight: '4px'}}/> {request?.gender}</p>
              <p className="flex items-center text-[13px]" title="Age"><VenusAndMars size={14} color="purple" style={{marginRight: '2px'}}/> {request?.age}</p>
              <p className="flex items-center text-[13px]" title="Location"><MapPin size={12} color="purple" style={{marginRight: '2px'}}/> {request?.location}</p>
            </div>
          </CardHeader>
        </div>
                  <CardContent>
          <CardDescription className="text-gray-300 pl-2">{request?.about.length >130 ? request?.about.slice(0,130) + "... more": request?.about}</CardDescription>
        </CardContent>
                  <CardFooter className="flex items-center gap-x-2 justify-end">
                    <Button
                    disabled={acceptPending && acceptLoading === request?._id}
                      className=" bg-gray-800 cursor-pointer hover:scale-102 hover:bg-gray-900"
                      onClick={() => handleAccept(request?._id, "accepted")}
                    >
                      {acceptPending && acceptLoading === request?._id ? <Spinner /> : "Accept"}
                    </Button>
                    <Button
                    disabled={rejectPending && rejectLoading === request?._id }
                      className="bg-transparent cursor-pointer"
                      onClick={() => handleReject(request?._id, "rejected")}
                    >
                      {rejectPending && rejectLoading === request?._id ? <Spinner /> : "Reject"}
                    </Button>
                  </CardFooter>
                </Card>
              </>
            );
          })
        ) : (
          store?.length === 0 ? <NotFound title="Requests" /> : <ShimmerUi/>
        )}
      </div>
    </>
  );
};
