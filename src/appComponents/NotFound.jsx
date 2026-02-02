import { useNavigate } from "react-router"
import { Button } from "../components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../components/ui/empty"

export const NotFound = ({title}) => {

    const navigate = useNavigate();

  return (
     <Empty>
      <EmptyHeader>
        <EmptyTitle className='text-white'>No {title} Found!</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t have any {title}. Try to explore new friends in the feed page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className='cursor-pointer bg-purple-800' onClick={()=> navigate(-1)}>Go back</Button>
      </EmptyContent>
    </Empty>
  )
}
