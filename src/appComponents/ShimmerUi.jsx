import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export const ShimmerUi = () => {
  return (
     <>
     <div className="flex flex-wrap items-center justify-start ml-[10%] gap-x-6 gap-y-6 mt-12 w-[90%] bg-black">
        <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
     <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
     <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
     <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
     <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
    <Card className="w-full max-w-xs bg-black border-0">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
     </div>
     </>
  )
}
