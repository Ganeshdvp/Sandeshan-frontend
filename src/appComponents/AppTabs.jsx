import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router';
import { Feed } from "./Feed";
import { Requests } from "./Requests";
import { Friends } from "./Friends";
import { Block } from "./Block";

export const AppTabs = () => {
  return (
    <Tabs defaultValue="feed" className="w-100">
      <TabsList>
        <Link to='/feed'><TabsTrigger value="feed">Feed</TabsTrigger></Link>
        <Link to='/requests'><TabsTrigger value="requests">Requests</TabsTrigger></Link>
        <Link to='/friends'><TabsTrigger value="friends">Friends</TabsTrigger></Link>
        <Link to='/block'><TabsTrigger value="block">Block users</TabsTrigger></Link>
      </TabsList>
      {/* <TabsContent value="feed">
        <Feed/>
      </TabsContent>
      <TabsContent value="requests">
        <Requests/>
      </TabsContent>
      <TabsContent value="friends">
        <Friends/>
      </TabsContent>
      <TabsContent value="block">
       <Block/>
      </TabsContent> */}
    </Tabs>
  )
}

