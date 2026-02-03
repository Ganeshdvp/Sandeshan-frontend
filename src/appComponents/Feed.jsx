import axios from "axios"
import { BASE_URL } from '../utils/constants';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from '../utils/feedSlice';
import { CardUser } from './CardUser';



export const Feed = () => {

  const dispatch = useDispatch()
  const store = useSelector(store=> store.feed);

  // fetching all users
  const fetchingAllUsers = async ()=>{
    try{
      const users = await axios.get(BASE_URL + '/users', {
        withCredentials: true
      });
      dispatch(addFeed(users.data?.data))
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!store){
      fetchingAllUsers()
    }
  },[]);


  return (
    <>
    <div className="flex flex-wrap items-center justify-start ml-[10%] gap-x-6 gap-y-6 mt-12 w-[90%] bg-black">
      {
      store?.map((card)=>{
        return (
          <>
          <CardUser data={card} key={card._id}/>
          </>
        )
      })
    }
    </div>
    </>
  )
}


