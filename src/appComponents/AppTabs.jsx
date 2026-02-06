import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useLocation, useNavigate } from "react-router";

export const AppTabs = () => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Tabs value={location.pathname}>
      <TabsList variant="line">
        <TabsTrigger
          value="/main/feed"
          onClick={()=> navigate('/main/feed')}
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Feed
        </TabsTrigger>
        <TabsTrigger
          value="/main/requests"
          onClick={()=> navigate('/main/requests')}
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Requests
        </TabsTrigger>
        <TabsTrigger
          value="/main/friends"
          onClick={()=> navigate('/main/friends')}
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Friends
        </TabsTrigger>
        <TabsTrigger
          value="/main/block"
          onClick={()=> navigate('/main/block')}
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Blocked Users
        </TabsTrigger>
        <TabsTrigger
          value="/main/profile"
          onClick={()=> navigate('/main/profile')}
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Profile
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
