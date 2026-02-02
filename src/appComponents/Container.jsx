import { NavBar } from "./NavBar";
import { AppTabs } from './AppTabs';
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useEffect } from "react";
import { Toaster } from "sonner";


export const Container = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async ()=>{
    try{
      const user = await axios.get(BASE_URL + '/profile', {
        withCredentials: true
      });
      dispatch(addUser(user.data.data))
    }
    catch(err){
      if(err.status === 401){
        navigate('/login')
      }
      console.log(err.response.data.message)
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])


  return (
    <>
    <Toaster richColors duration={2000}/>

    <NavBar/>
    
    <div className="flex flex-col gap-y-4">
      <AppTabs/>
      <Outlet/>
    </div>
    </>
  )
}
