import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addBlock } from '../utils/blockSlice';
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
import { NotFound } from './NotFound';


export const Block = () => {

  const dispatch = useDispatch();
  const store = useSelector(store=> store.block);



  // fetching blocked users
  const fetchBlockUsers = async ()=>{
    try{
      const blockUsers = await axios.get(BASE_URL + '/blocked-users', {
        withCredentials: true
      })
      dispatch(addBlock(blockUsers?.data?.data))
    }
    catch(err){
      console.log(err)
    }
  }

  // UnBlock logic
  const handleUnBlock = async (id)=>{
    try{
      console.log(id)
    }
    catch(err){
      console.log(err)
    }
  }

  // remove logic
    const handleRemove = async (id)=>{
    try{
      console.log(id)
    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    if(!store){
      fetchBlockUsers();
    }
  },[])


  return (
    <>
     <div className="flex flex-wrap mt-20">
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
                  <Button className=' bg-purple-950 cursor-pointer' onClick={()=> handleUnBlock(request._id)}>Unblock</Button>
                  <Button className='bg-transparent border cursor-pointer hover:bg-gray-300 hover:text-black' onClick={()=> handleRemove(request._id)}>Remove</Button>
                </CardFooter>
              </Card>
            </>
          );
        }) : <NotFound title='Blocked users' />}
      </div>
    </>
  )
}
