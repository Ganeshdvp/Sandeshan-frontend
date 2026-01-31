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
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { Outlet, useNavigate } from "react-router";
import { Spinner } from "../components/ui/spinner";
import { Link } from 'react-router';

export const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("ganesh@gmail.com");
  const [password, setPassword] = useState("Ganesh2@123");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [about, setAbout] = useState("Hey there! Welcome to the Profile!");

  const [toggleForm, setToggleForm] = useState(false);

  // loading state
  const [loading, setLoading] = useState(false)

  //error state
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // submit Sign in form
  const handleSignInSubmit = async () => {
    try{
      setLoading(true)
      const signInData = await axios.post(BASE_URL + '/signin', {
        emailId : email,
        password: password,
      }, {withCredentials: true})

      dispatch(addUser(signInData.data.data));
      setLoading(false)
      navigate('/feed');
    }
    catch(err){
      setSignInError("* "+ err.response.data.message)
      setLoading(false)
      console.log(err)
    }
  };

  
  // submit Sign Up form
    const handleSignUpSubmit = async () => {
    try{
      setLoading(true)
      const data = {
        firstName,
        lastName,
        emailId : email,
        password,
        age,
        gender,
        location,
        about,
        ProfileImage: profileImage,
        bgImage: bgImage
      }
      await axios.post(BASE_URL + '/signup', data)
      setLoading(false)
      setToggleForm(false)
    }
    catch(err){
      setSignUpError("* "+ err.response.data.message)
      setLoading(false)
      console.log(err)
    }
  };

  return (
    <>
    <div className="absolute w-full h-full inset-1 bg-black/80 top-0 left-0 right-0 bottom-0">
       <Card className={toggleForm ? "max-w-lg h-150 mx-auto mt-20 border-0 bg-purple-800 overflow-y-scroll shadow-[0_0_22px_rgba(168,85,247,0.35)] no-scrollbar" : "w-full max-w-md h-100 mx-auto mt-30 bg-purple-800 border-0 shadow-[0_0_22px_rgba(168,85,247,0.35)]"}>
        <CardHeader>
          <CardTitle className='text-2xl text-white'>{toggleForm ? "Create your account" : "Login to your account"}</CardTitle>
          <CardDescription  className='text-gray-300'>
            {toggleForm ? "Create your account to communicate with others" : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {
                toggleForm && (
                    <>
                    <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
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
                    <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
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
              <div className="grid gap-2 text-white">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="text"
                  required
                  placeholder='Enter image url...'
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="bgImage">Background Image</Label>
                <Input
                  id="bgImage"
                  type="text"
                  placeholder='Enter image url...'
                  required
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                />
              </div>
               <div className="grid gap-2 text-white">
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
          <p className="text-red-600 text-[12px]">{toggleForm ? signUpError : signInError}</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-purple-950 cursor-pointer hover:bg-purple-900" onClick={toggleForm ? handleSignUpSubmit : handleSignInSubmit}>
            {
              loading ? <Spinner/> : (
                toggleForm ? "Sign Up" : "Login"
              )
            }
          </Button>
          <CardAction>
            <Button className={toggleForm ? "cursor-pointer text-[12px] text-white ml-32" : "cursor-pointer text-[12px] text-white ml-22"} variant="link" onClick={()=> setToggleForm(!toggleForm)}>{toggleForm ? "Already have an account ? Login" : "Don't you have an account? Sign Up"}</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
    </>
  );
};
