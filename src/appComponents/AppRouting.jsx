import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import { Container } from "./Container";
import { Feed } from "./Feed";
import { Requests } from "./Requests";
import { Friends } from "./Friends";
import { Block } from "./Block";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { ProfileEdit } from "./ProfileEdit";
import { ForgotPassword } from "./ForgotPassword";
import { Chat } from "./Chat";
import { HeroPage } from './HeroPage';


export const AppRouting = () => {
  const user = useSelector((store) => store?.user);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      children: [
        {
          path: "login",
          element: user ? <Navigate to='/feed' replace/> : <Login />,
        },
        {
          path: "feed",
          element: <Feed />,
        },
        {
          path: "requests",
          element: <Requests />,
        },
        {
          path: "friends",
          element: <Friends />,
        },
        {
          path: "block",
          element: <Block />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "edit",
              element: <ProfileEdit />,
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
          ],
        },
        {
          path: "chat/:targetId",
          element: <Chat />,
        },
         {
          path: "hero",
          element: <HeroPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
