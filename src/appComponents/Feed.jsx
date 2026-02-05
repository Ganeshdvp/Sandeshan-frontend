import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { CardUser } from "./CardUser";
import { ShimmerUi } from "./ShimmerUi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { NotFound } from "./NotFound";
import { useQuery } from "@tanstack/react-query";

export const Feed = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.feed);
  const [page, setPage] = useState(1);

  // fetching all users
  const {data, isError, error} = useQuery({
    queryKey: ['feed', page],
    queryFn: async ()=>{
      const users = await axios.get(BASE_URL + `/users?page=${page}&limit=10`,{
        withCredentials:true
      });
      return users.data?.data;
    },
    retry: 2,
    refetchOnWindowFocus : false,
    gcTime: 1000*60*30,
  })
  if(isError){
    console.log(error);
  }
  // const fetchingAllUsers = async () => {
  //   try {
  //     const users = await axios.get(BASE_URL + `/users?page=${page}&limit=10`, {
  //       withCredentials: true,
  //     });
  //     dispatch(addFeed(users.data?.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    if(data){
      dispatch(addFeed(data));
    }
  }, [data,dispatch]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-start ml-[10%] gap-x-6 gap-y-6 mt-12 w-[90%] bg-black">
        {store?.length > 0 ? (
          store?.map((card) => {
            return (
              <>
                <CardUser data={card} key={card._id} />
              </>
            );
          })
        ) : store?.length === 0 ? (
          <NotFound title="more users" />
        ) : (
          <ShimmerUi />
        )}
      </div>
      <Pagination className="text-white mt-[15%]">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page > 0) setPage(page - 1);
              }}
              className="cursor-pointer text-gray-500  data-[state=active]:text-black"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === 1}
              onClick={() => {
                setPage(1);
              }}
              className="cursor-pointer text-gray-500  data-[state=active]:text-black"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === 2}
              onClick={() => {
                setPage(2);
              }}
              className="cursor-pointer text-gray-500  data-[state=active]:text-black"
            >
              2
            </PaginationLink>
            <PaginationLink
              isActive={page === 3}
              onClick={() => {
                setPage(3);
              }}
              className="cursor-pointer text-gray-500  data-[state=active]:text-black"
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-gray-500" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (store?.length < 3) return;
                setPage(page + 1);
              }}
              className="cursor-pointer text-gray-500  data-[state=active]:text-black"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
