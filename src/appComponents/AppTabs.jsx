import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router';

export const AppTabs = () => {
  return (
    <Tabs defaultValue="feed" className="mx-auto w-120 h-12 bg-black flex items-center rounded-2xl shadow-[0_10px_22px_rgba(168,85,247,0.35)]
">
      <TabsList className="bg-purple-800 text-white">
        <Link to='/feed'><TabsTrigger value="feed" className='w-20 active:scale-120 cursor-pointer hover:text-white'>Feed</TabsTrigger></Link>
        <Link to='/requests'><TabsTrigger value="requests" className='w-20 active:scale-120 cursor-pointer hover:text-white'>Requests</TabsTrigger></Link>
        <Link to='/friends'><TabsTrigger value="friends" className='w-20 active:scale-120 cursor-pointer hover:text-white'>Friends</TabsTrigger></Link>
        <Link to='/block'><TabsTrigger value="block" className='w-24 active:scale-120 cursor-pointer hover:text-white'>Block users</TabsTrigger></Link>
        <Link to='/profile'><TabsTrigger value="profile" className='w-24 active:scale-120 cursor-pointer hover:text-white'>Profile</TabsTrigger></Link>
      </TabsList>
    </Tabs>
  )
}

