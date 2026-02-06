import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

export const ProfileShimmerUi = () => {
  return (
    <Card className="w-full max-w-2xl bg-black border-0 text-white mx-auto">
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Skeleton className='bg-gray-900 rounded-xl w-full h-70 object-cover'></Skeleton>
              </div>
              <div className="grid gap-2 relative -top-25">
                <div className="flex justify-between">
                 <Skeleton className="w-35 h-35 bg-gray-800 rounded-full"></Skeleton>
                </div>
              </div>
              <Skeleton  className="grid gap-2 -mt-26 bg-gray-800 w-40 h-8 rounded-2xl">
              </Skeleton>
              <Skeleton  className="grid gap-2 bg-gray-800 w-40 h-8 rounded-2xl">
              </Skeleton>
              <Skeleton  className="grid gap-2 bg-gray-800 w-40 h-8 rounded-2xl">
              </Skeleton>
              <Skeleton  className="grid gap-2 bg-gray-800 w-40 h-8 rounded-2xl">
              </Skeleton>
              
            </div>
          </form>
        </CardContent>
      </Card>
  )
}
