import { NavBar } from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useEffect } from "react";
import { Toaster } from "sonner";


export const Container = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=> store.user);

  // fetch user only
  const fetchUser = async ()=>{
    try{
      const user = await axios.get(BASE_URL + '/profile', {
        withCredentials: true
      });
      dispatch(addUser(user?.data?.data))
    }
    catch(err){
      if(err.status === 401){
        navigate('/login')
      }
      console.log(err.response.data.message)
    }
  }

  useEffect(()=>{
    if(!user){
      fetchUser();
    }
  },[])


  return (
    <>
    <Toaster richColors duration={2000}/>

    <NavBar/>
    
    {/* child routes render here */}
    <Outlet/>

    </>
  )
}
