import { TriangleAlert } from "lucide-react";
import { Button } from "../components/ui/button";

export const Banner = ({setOpen}) => {

  return (
    <div className='w-full h-fit gap-x-2 bg-gray-800 text-white flex items-center justify-center px-10 py-1 transition-300'>
        <TriangleAlert className="w-16 h-16 sm:max-w-3 sm:max-h-3"/>
        <p className='text-[14px] leading-6'>This website is built for learning purposes. It is not affiliated with any other chatting applications. user-submitted data is not used for real social networking or communication services and may be periodically deleted.</p>
        <Button className='bg-transparent underline text-[12px] hover:bg-transparent hover:scale-105 cursor-pointer' onClick={() => setOpen(false)}>close</Button>
    </div>
  )
}
