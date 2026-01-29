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
import { useNavigate } from "react-router";

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
  const [about, setAbout] = useState("");

  const [toggleForm, setToggleForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // submit Sign in form
  const handleSignInSubmit = async () => {
    try{
      const signInData = await axios.post(BASE_URL + '/signin', {
        emailId : email,
        password: password,
      }, {withCredentials: true})

      dispatch(addUser(signInData.data.data));
      navigate('/feed');
    }
    catch(err){
      console.log(err)
    }
  };

  
  // submit Sign Up form
    const handleSignUpSubmit = async () => {
    try{
      const data = {
        firstName,
        lastName,
        emailId : email,
        password,
        age,
        gender,
        location,
        about
      }
      const signUpData = await axios.post(BASE_URL + '/signup', data)

      dispatch(addUser(signUpData.data.data));
      setToggleForm(false)
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>{toggleForm ? "Create your account" : "Login to your account"}</CardTitle>
          <CardDescription>
            {toggleForm ? "Create your account to communicate with others" : "Enter your email below to login to your account"}
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={()=> setToggleForm(!toggleForm)}>{toggleForm ? "Login" : "Sign Up"}</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {
                toggleForm && (
                    <>
                    <div className="grid gap-2">
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
              <div className="grid gap-2">
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
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
                    <div className="grid gap-2">
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
              <div className="grid gap-2">
                <Select value={gender} onValueChange={setGender}>
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
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  required
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bgImage">Background Image</Label>
                <Input
                  id="bgImage"
                  type="file"
                  placeholder="Enter your location"
                  required
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                />
              </div>
               <div className="grid gap-2">
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
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-purple-900" onClick={toggleForm ? handleSignUpSubmit : handleSignInSubmit}>
            {toggleForm ? "Sign Up" : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            {toggleForm ? "Sign Up with Google" : "Login with Google"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
