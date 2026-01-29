import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from '../utils/friendsSlice';
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";


export const Friends = () => {

  const dispatch = useDispatch();
  const store = useSelector(store=> store.friend);

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

  useEffect(()=>{
    if(!store){
      fetchFriends();
    }
  },[])

  const handleUnFriend = (firstName)=>{
    console.log("unfriend", firstName)
  }

  return (
     <div className="flex flex-wrap">
        {store?.map((request) => {
          return (
            <>
              <Card className="relative mx-auto w-full max-w-sm pt-0" key={request?._id}>
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
                  <Button onClick={()=> handleUnFriend(request?.firstName)}>Un Friend</Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
  )
}
