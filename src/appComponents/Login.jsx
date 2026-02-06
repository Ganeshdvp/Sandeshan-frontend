import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from '../components/ui/textarea';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { Spinner } from "../components/ui/spinner";
import { Link } from 'react-router';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";



export const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("shiva@gmail.com");
  const [password, setPassword] = useState("Shiva3@123");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("Hey there! Welcome to the Profile!");

  // toggle the form
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();

  // submit Sign in form
  const { mutate:signInMutation, isPending:signInPending , error:sigInError} = useMutation({
    mutationFn: async (data)=>{
      const signInData = await axios.post(BASE_URL + '/signin', data , {withCredentials: true});
      dispatch(addUser(signInData.data.data));
    }
  })
  const handleSignInSubmit = ()=>{
    const signInData = {
        emailId : email,
        password: password,
      }
    signInMutation(signInData);
  }


  
  // submit Sign Up form
    const { mutate:signUpMutation, isPending:signUpPending, error:signUpError} = useMutation({
    mutationFn: async (data)=>{
      await axios.post(BASE_URL + '/signup', data);
       setToggleForm(false)
    }
  })
  const handleSignUpSubmit = ()=>{
    const signUpData = {
        firstName,
        lastName,
        emailId : email,
        password,
        age,
        gender,
        location,
        about,
      }
    signUpMutation(signUpData);
  }


  // Sign in logic
   // const handleSignInSubmit = async () => {
  //   try{
  //     setLoading(true)
  //     const signInData = await axios.post(BASE_URL + '/signin', {
  //       emailId : email,
  //       password: password,
  //     }, {withCredentials: true})

  //     dispatch(addUser(signInData.data.data));
  //     setLoading(false)
  //     navigate('/main/feed');
  //   }
  //   catch(err){
  //     setSignInError("* "+ err.response.data.message)
  //     setLoading(false)
  //     console.log(err)
  //   }
  // };

  //   const handleSignUpSubmit = async () => {
  //   try{
  //     setLoading(true)
  //     const data = {
  //       firstName,
  //       lastName,
  //       emailId : email,
  //       password,
  //       age,
  //       gender,
  //       location,
  //       about,
  //     }
  //     await axios.post(BASE_URL + '/signup', data)
  //     setLoading(false)
  //     setToggleForm(false)
  //   }
  //   catch(err){
  //     setSignUpError("* "+ err.response.data.message)
  //     setLoading(false)
  //     console.log(err)
  //   }
  // };

  return (
    <>
    <div className="absolute w-full h-full inset-1 bg-black/80 top-0 left-0 right-0 bottom-0">
       <Card className={toggleForm ? "max-w-lg h-150 mx-auto mt-20 border-0 bg-white overflow-y-scroll shadow-[0_0_22px_rgba(168,85,247,0.35)] no-scrollbar" : "w-full max-w-md h-fit mx-auto mt-30 bg-white border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)]"}>
        <CardHeader>
          <CardTitle className='text-2xl text-black'>{toggleForm ? "Create your account" : "Login to your account"}</CardTitle>
          <CardDescription  className='text-gray-500'>
            {toggleForm ? "Create your account to communicate with others" : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {
                toggleForm && (
                    <>
                    <div className="grid gap-2 text-black">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2 text-black">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
                    </>
                )
              }
              <div className="grid gap-2 text-black">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="account@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2 text-black">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {
                    !toggleForm && <Link to='/login'>
                      <p className="ml-60 inline-block text-[12px] underline-offset-4 hover:underline">Forgot password</p>
                    </Link>
                  }
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {
                toggleForm && (
                    <>
                    <div className="grid gap-2 text-black">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="grid gap-2 text-black">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender} className='bg-transparent'>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select your Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 text-black">
                <Label htmlFor="age">Location</Label>
                <Input
                  id="age"
                  type="text"
                  placeholder="Enter your location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
               <div className="grid gap-2 text-black">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  type="text"
                  placeholder="Enter your about"
                  required
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
                    </>
                )
              }
            </div>
          </form>
          <p className="text-red-600 text-[12px]">{toggleForm ? signUpError?.response?.data?.message : sigInError?.response?.data?.message}</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-black cursor-pointer hover:bg-gray-800 hover:scale-102" onClick={toggleForm ? handleSignUpSubmit : handleSignInSubmit}>
            {
              toggleForm ? (signUpPending ? <Spinner/> : "Sign Up") : (signInPending ? <Spinner/> : "Login") 
            }
          </Button>
          <CardAction>
            <Button className={toggleForm ? "cursor-pointer text-[12px] text-black ml-32" : "cursor-pointer text-[12px] text-black ml-22"} variant="link" onClick={()=> setToggleForm(!toggleForm)}>{toggleForm ? "Already have an account ? Login" : "Don't you have an account? Sign Up"}</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
    </>
  );
};
