import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";

export const AppTabs = () => {
  return (
    <Tabs defaultValue="/main/feed">
      <TabsList variant="line">
        <Link to='/main/feed'>
        <TabsTrigger
          value="/main/feed"
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Feed
        </TabsTrigger>
        </Link>
        <Link to='/main/requests'>
        <TabsTrigger
          value="/main/requests"
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Requests
        </TabsTrigger>
        </Link>
        <Link to='/main/friends'>
        <TabsTrigger
          value="/main/friends"
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Friends
        </TabsTrigger>
        </Link>
        <Link to='/main/block'>
        <TabsTrigger
          value="/main/blocked"
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Blocked Users
        </TabsTrigger>
        </Link>
        <Link to='/main/profile'>
        <TabsTrigger
          value="/main/profile"
          className="mr-2 text-gray-600 hover:text-gray-500 data-[state=active]:border-b-white data-[state=active]:text-white cursor-pointer"
        >
          Profile
        </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};
