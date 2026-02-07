import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addBlock } from '../utils/blockSlice';
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { NotFound } from './NotFound';
import { MapPin, Mars, VenusAndMars } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "../components/ui/spinner";
import { ShimmerUi } from './ShimmerUi';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const Block = () => {

  const dispatch = useDispatch();
  const store = useSelector(store=> store.block);

  const [loading, setLoading] = useState(null);



  // fetching blocked users
  const {data} = useQuery({
    queryKey: ['block-users'],
    queryFn: async ()=>{
      const blockUsers = await axios.get(BASE_URL + '/blocked-users', {
        withCredentials: true
      })
      return blockUsers?.data?.data;
    },
     retry: 2,
    refetchOnWindowFocus : false,
    gcTime: 1000*60*30,
  })
  useEffect(()=>{
    if(data){
      dispatch(addBlock(data))
    }
  },[data,dispatch]);

  // UnBlock logic
  const queryClient = useQueryClient();
  const {mutate:unBlockMutate, isPending:unBlockPending} = useMutation({
    mutationFn: async (id)=>{
      await axios.delete(BASE_URL + `/unblock/${id}`, {
        withCredentials: true
      });
    },
    onSettled:()=>{
      setLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['block-users']});
        toast.success("Successfully unblocked!", {
              position: "top-right",
              style: {
                background: "#0D0000",
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
  const handleUnBlock = (id)=>{
    setLoading(id);
    unBlockMutate(id)
  }

  // remove logic
  const {mutate:removeMutate, isPending:removePending} = useMutation({
    mutationFn: async (id)=>{
        await axios.patch(BASE_URL + `/remove/${id}`, {}, {
        withCredentials: true
      });
    },
      onSettled:()=>{
      setLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['block-users']});
        toast.success("Successfully removed!", {
              position: "top-right",
              style: {
                background: "#0D0000",
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
  const handleRemove = (id)=>{
    setLoading(id)
    removeMutate(id);
  }

   // const fetchBlockUsers = async ()=>{
  //   try{
  //     const blockUsers = await axios.get(BASE_URL + '/blocked-users', {
  //       withCredentials: true
  //     })
  //     dispatch(addBlock(blockUsers?.data?.data))
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  // const handleUnBlock = async (id)=>{
  //   try{
  //     setUnBlockLoading(id)
  //     await axios.delete(BASE_URL + `/unblock/${id}`, {
  //       withCredentials: true
  //     });
  //     setUnBlockLoading(null);
  //     toast.success("Successfully unblocked!", {
  //             position: "bottom-right",
  //             style: {
  //               background: "#0D0000",
  //               color: "#ffff",
  //               borderRadius: "5px",
  //               fontSize: "12px",
  //               width: "250px",
  //               height: "40px",
  //                border:'none',
  //               boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //             },
  //           });
  //   }
  //   catch(err){
  //     setUnBlockLoading(null);
  //     console.log(err)
  //   }
  // }

  //   const handleRemove = async (id)=>{
  //   try{
  //     setRemoveLoading(id);
  //     await axios.patch(BASE_URL + `/remove/${id}`, {}, {
  //       withCredentials: true
  //     });
  //     setRemoveLoading(null);
  //     toast.success("Successfully removed!", {
  //             position: "bottom-right",
  //             style: {
  //               background: "#0D0000",
  //               color: "#ffff",
  //               borderRadius: "5px",
  //               fontSize: "12px",
  //               width: "250px",
  //               height: "40px",
  //                border:'none',
  //               boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //             },
  //           });
  //   }
  //   catch(err){
  //     setRemoveLoading(null);
  //     console.log(err);
  //   }
  // }

  // useEffect(()=>{
  //   if(!store){
  //     fetchBlockUsers();
  //   }
  // },[])


  return (
    <>
     <div className="flex flex-wrap items-center justify-center mx-auto gap-x-6 gap-y-6 mt-12 w-full bg-black">
        {store?.length > 0 ? store?.map((request) => {
          return (
            <>
              <Card key={request?._id} className="flex flex-col cursor-pointer bg-black min-w-90 sm:min-w-100 max-w-100 border border-white/50 shadow-[10px_10px_500px_rgba(10,10,50,0.35)]">
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
                <CardFooter className='flex items-center gap-x-2 justify-end'>
                  <Button className=' bg-gray-800 cursor-pointer hover:scale-103' disabled={unBlockPending && loading === request?._id} onClick={()=> handleUnBlock(request?._id)}>{unBlockPending && loading === request?._id ? <Spinner/> : "Unblock"}</Button>
                  <Button className='bg-transparent cursor-pointer' disabled={removePending && loading === request?._id } onClick={()=> handleRemove(request?._id)}>{removePending && loading === request?._id ? <Spinner/> : "Remove"}</Button>
                </CardFooter>
              </Card>
            </>
          );
        }) : store?.length === 0 ? <NotFound title='Blocked users' /> : <ShimmerUi/>}
      </div>
    </>
  )
}
