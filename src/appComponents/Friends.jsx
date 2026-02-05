import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../utils/friendsSlice";
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
import { Spinner } from "../components/ui/spinner";
import { toast } from "sonner";
import { NotFound } from "./NotFound";
import { Link } from "react-router";
import { MapPin, Mars, VenusAndMars } from "lucide-react";
import { ShimmerUi } from './ShimmerUi';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const Friends = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store?.friend);

  const [loading, setLoading] = useState(null);

  // fetch friends
  const {data} = useQuery({
    queryKey: ['friends'],
    queryFn: async ()=>{
      const friends = await axios.get(BASE_URL + "/friends", {
        withCredentials: true,
      });
      return friends.data?.data;
    },
     retry: 2,
    refetchOnWindowFocus : false,
    gcTime: 1000*60*30,
  })
    useEffect(()=>{
      if(data){
        dispatch(addFriend(data))
      }
    },[data,dispatch]);
  // const fetchFriends = async () => {
  //   try {
  //     const friends = await axios.get(BASE_URL + "/friends", {
  //       withCredentials: true,
  //     });
  //     dispatch(addFriend(friends.data?.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // unfriend
  const queryClient = useQueryClient();
  const {mutate:unFriendMutate, isPending:unFriendPending} = useMutation({
    mutationFn: async (id)=>{
      await axios.delete(BASE_URL + `/unfriend/${id}`, {
        withCredentials: true,
      });
    },
    onSettled: ()=>{
      setLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['friends']});
       toast.success("Successfully unfriend!", {
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
  const handleUnFriend = (id)=>{
    setLoading(id);
    unFriendMutate(id)
  }
  // const handleUnFriend = async (id) => {
  //   try {
  //     setUnFriendLoading(id);
  //     await axios.delete(BASE_URL + `/unfriend/${id}`, {
  //       withCredentials: true,
  //     });
  //     setUnFriendLoading("");
  //     toast.success("Successfully removed!", {
  //       position: "bottom-right",
  //       style: {
  //         background: "#0D0000",
  //         color: "#ffff",
  //         borderRadius: "5px",
  //         fontSize: "12px",
  //         width: "250px",
  //         height: "40px",
  //          border:'none',
  //         boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //       },
  //     });
  //   } catch (err) {
  //     setUnFriendLoading("");
  //     console.log(err);
  //   }
  // };

  // block logic
  const {mutate:blockMutate, isPending:blockPending} = useMutation({
    mutationFn: async (id)=>{
       await axios.post(
        BASE_URL + `/blocked/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
    },
    onSettled: ()=>{
      setLoading(null);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['friends']});
       toast.success("Successfully blocked!", {
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
  const handleBlockUsers = (id)=>{
    setLoading(id);
    blockMutate(id);
  }
  // const handleBlockUsers = async (id) => {
  //   try {
  //     setBlockLoading(id);
  //     await axios.post(
  //       BASE_URL + `/blocked/${id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     setBlockLoading("");
  //     toast.success("You blocked successfully!", {
  //       position: "bottom-right",
  //       style: {
  //         background: "#0D0000",
  //         color: "#ffff",
  //         borderRadius: "5px",
  //         fontSize: "12px",
  //         width: "250px",
  //         height: "40px",
  //          border:'none',
  //         boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
  //       },
  //     });
  //   } catch (err) {
  //     setBlockLoading("");
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (!store) {
  //     fetchFriends();
  //   }
  // }, []);

  return (
    <div className="flex flex-wrap items-center justify-start ml-[10%] gap-x-6 gap-y-6 mt-12 w-[90%] bg-black">
      {store?.length > 0 ? (
        store?.map((request) => {
          return (
            <>
              <Card
                className="flex flex-col cursor-pointer bg-black min-w-100 max-w-100 border border-white/50 shadow-[10px_10px_500px_rgba(10,10,50,0.35)]"
                key={request?._id}
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
                    className=" bg-transparent cursor-pointer"
                    onClick={() => handleUnFriend(request?._id)}
                    disabled= {unFriendPending && loading === request?._id}
                  >
                    {unFriendPending && loading === request?._id ? (
                      <Spinner />
                    ) : (
                      "Un Friend"
                    )}
                  </Button>
                  <Button
                    className="bg-transparent cursor-pointer"
                    onClick={() => handleBlockUsers(request?._id)}
                    disabled = {blockPending && loading === request?._id}
                  >
                    {blockPending && loading === request?._id ? <Spinner /> : "Block"}
                  </Button>
                  <Link to={`/main/chat/${request?._id}`}>
                    <Button className=" bg-gray-800 hover:bg-gray-900 hover:scale-103 cursor-pointer">
                      Chat
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </>
          );
        })
      ) : (
        store?.length === 0 ? <NotFound title="Friends" /> : <ShimmerUi/>
      )}
    </div>
  );
};
