import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from '../utils/friendsSlice';
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
import { Spinner } from '../components/ui/spinner';
import {toast} from 'sonner';
import { NotFound } from "./NotFound";
import { Link } from "react-router";


export const Friends = () => {

  const dispatch = useDispatch();
  const store = useSelector(store=> store?.friend);

  const [unfriendLoading, setUnFriendLoading] = useState("");
  const [blockLoading, setBlockLoading] = useState("");

  // fetch friends
  const fetchFriends = async ()=>{
    try{
      const friends = await axios.get(BASE_URL + '/friends', {
        withCredentials:true
      });
      dispatch(addFriend(friends.data?.data))
    }
    catch(err){
      console.log(err)
    }
  }

  // unfriend
  const handleUnFriend = async (id)=>{
    try{
      setUnFriendLoading(id)
      await axios.delete(BASE_URL + `/unfriend/${id}`, {withCredentials:true})
      setUnFriendLoading("");
      toast.success("Successfully removed!", {
                    position: "bottom-right",
                    style:{
                      background:'#0D0000',
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
      setUnFriendLoading("")
      console.log(err);
    }
  }

  // block logic
  const handleBlockUsers = async (id)=>{
    try{
      setBlockLoading(id)
      await axios.post(BASE_URL + `/blocked/${id}`, {}, {
        withCredentials:true
      });
      setBlockLoading("");
      toast.success("You blocked successfully!", {
                    position: "bottom-right",
                    style:{
                      background:'#0D0000',
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
      setBlockLoading("")
      console.log(err);
    }
  }

  useEffect(()=>{
    if(!store){
      fetchFriends();
    }
  },[])


  return (
     <div className="flex flex-wrap gap-y-8 mt-12 w-full p-6">
        {store?.length > 0 ? store?.map((request) => {
          return (
            <>
              <Card className="relative mx-auto w-75 max-w-sm pt-0 bg-purple-800 border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)] hover:scale-102 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
transition-shadow duration-300 cursor-pointer" key={request?._id}>
                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                <img
                  src={request?.ProfileImage}
                  alt="Event cover"
                  className="relative z-20 aspect-video w-full object-cover rounded-2xl"
                />
                <CardHeader>
                  <CardTitle className='-mt-2 text-xl text-white font-semibold'>
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
                  <Link to={`/chat/${request?._id}`}><Button className=' bg-purple-950 cursor-pointer'>Chat</Button></Link>
                  <Button className=' bg-purple-950 cursor-pointer' onClick={()=> handleUnFriend(request?._id)}>{unfriendLoading === request?._id ? <Spinner/> : "Un Friend"}</Button>
                  <Button className='bg-transparent border cursor-pointer hover:bg-gray-300 hover:text-black' onClick={()=> handleBlockUsers(request?._id)}>{blockLoading === request?._id ? <Spinner/> : "Block"}</Button>
                </CardFooter>
              </Card>
            </>
          );
        }) : <NotFound title= 'Friends' /> }
      </div>
  )
}
