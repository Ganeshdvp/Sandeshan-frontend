import { InfoIcon, MessageCircle, MoveRight } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router";
import { Container } from "./Container";

export const HeroPage = () => {

  const navigate = useNavigate();


  return (
    <>
      <h2 className="text-white text-2xl font-bold mt-8 ml-18">Sandeshan</h2>
      <section className="flex items-center gap-x-30 sm:gap-x-0 p-12 mt-14">
        <div className="w-200 ml-8">
          <h1 className="text-white text-5xl">
            Connect Instantly.
            <br /> Communicate Without Limits.
          </h1>
          <p className="text-gray-400 ml-2 mt-2">
            Chat smarter with a real-time messaging platform designed for speed,
            security, and simplicity.Stay connected with friends, teams, and
            communities—anytime, anywhere.
          </p>
          <div className="flex items-center gap-x-4">
            <Link to='/login'>
            <Button className="bg-white text-black p-4 mt-8 hover:bg-gray-400 cursor-pointer">
              Get Started Free
            </Button>
            </Link>
            {/* <InfoIcon color="white" className="mt-8 cursor-pointer"/> */}
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon color="white" className="mt-8 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side={MoveRight}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="ml-18">
          <div className="bg-gray-600 w-90 p-4 rounded-md flex flex-col gap-y-3 hover:scale-102 cursor-pointer">
            <p className="text-white flex items-center gap-x-2">
              <MessageCircle size={18} /> Real-time Messaging
            </p>
            <p className="text-gray-400 text-sm">
              Send and receive messages instantly with smooth, real-time updates
              powered by modern web technologies
            </p>
          </div>
          <div className="relative left-20 -top-4 shadow-[0_20px_40px] bg-gray-600 w-90 p-4 rounded-md flex flex-col gap-y-3 hover:scale-102 cursor-pointer">
            <p className="text-white flex items-center gap-x-2">
              <MessageCircle size={18} /> Fast & Reliable
            </p>
            <p className="text-gray-400 text-sm">
              Optimized for performance to ensure low latency and a seamless
              chat experience.
            </p>
          </div>
          <div className="relative left-30 -top-2 bg-gray-600 w-90 p-4 rounded-md flex flex-col gap-y-3 hover:scale-102 cursor-pointer">
            <p className="text-white flex items-center gap-x-2">
              <MessageCircle size={18} /> Cross-Platform Ready
            </p>
            <p className="text-gray-400 text-sm">
              Enjoy a consistent chat experience across desktop, tablet, and
              mobile devices.
            </p>
          </div>
          <div className="relative -top-3 shadow-[0_20px_40px] bg-gray-600 w-90 p-4 rounded-md flex flex-col gap-y-3 hover:scale-102 cursor-pointer">
            <p className="text-white flex items-center gap-x-2">
              <MessageCircle size={18} /> Secure Conversations
            </p>
            <p className="text-gray-400 text-sm">
              Your messages stay private with strong authentication and secure
              data handling.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
