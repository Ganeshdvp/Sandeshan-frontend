import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Spinner } from "../components/ui/spinner";
import { toast } from "sonner";
import { NotFound } from "./NotFound";
import { ShimmerUi} from './ShimmerUi';
import { MapPin, Mars, VenusAndMars } from "lucide-react";

export const Requests = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.request);

  const [acceptLoading, setAcceptLoading] = useState("");
  const [rejectLoading, setRejectLoading] = useState("");

  // fetch requests
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(requests.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  // handle accept
  const handleAccept = async (id, accepted) => {
    try {
      setAcceptLoading(id);
      await axios.post(
        BASE_URL + `/requests/${accepted}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setAcceptLoading("");
      toast.success("Aceepted the request successfully!", {
        position: "top-right",
        style: {
          background: "black",
          color: "#ffff",
          borderRadius: "5px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
            border:'none',
          boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
        },
      });
    } catch (err) {
      setAcceptLoading("");
      console.log(err);
    }
  };

  // handle reject
  const handleReject = async (id, rejected) => {
    try {
      setRejectLoading(id);
      await axios.post(
        BASE_URL + `/requests/${rejected}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setRejectLoading("");
      toast.success("Rejected the request successfully!", {
        position: "bottom-right",
        style: {
          background: "black",
          color: "#ffff",
          borderRadius: "5px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
             border:'none',
          boxShadow: "0 0px 20px rgba(255,255,255,0.15)",
        },
      });
    } catch (err) {
      setRejectLoading("");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!store) {
      fetchRequests();
    }
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-start ml-[10%] gap-x-6 gap-y-6 mt-12 w-[90%] bg-black">
        {store?.length > 0 ? (
          store?.map((request) => {
            return (
              <>
                <Card
                  className="flex flex-col cursor-pointer bg-black min-w-100 max-w-100 border border-white/50 shadow-[10px_10px_500px_rgba(10,10,50,0.35)]"
                >
                  <div className="flex items-center pl-4">
          <img
            src={request?.ProfileImage}
            alt="Event cover"
            className=" w-15 h-15 object-fit rounded-full"
          />
          <CardHeader className='-ml-2'>
            <CardTitle className="w-60 text-xl text-white font-semibold">
              {request?.firstName + " " + request?.lastName}
            </CardTitle>
            <div className="text-white flex -mt-2 gap-x-2 items-center">
              <p className="flex items-center text-[13px]" title="Gender"><Mars size={14} color="purple" style={{marginRight: '4px'}}/> {request?.gender}</p>
              <p className="flex items-center text-[13px]" title="Age"><VenusAndMars size={14} color="purple" style={{marginRight: '2px'}}/> {request?.age}</p>
              <p className="flex items-center text-[13px]" title="Location"><MapPin size={12} color="purple" style={{marginRight: '2px'}}/> {request?.location}</p>
            </div>
          </CardHeader>
        </div>
                  <CardContent>
          <CardDescription className="text-gray-300 pl-2">{request?.about.length >130 ? request?.about.slice(0,130) + "... more": request?.about}</CardDescription>
        </CardContent>
                  <CardFooter className="flex items-center gap-x-2 justify-end">
                    <Button
                      className=" bg-gray-800 cursor-pointer hover:scale-102 hover:bg-gray-900"
                      onClick={() => handleAccept(request?._id, "accepted")}
                    >
                      {acceptLoading === request._id ? <Spinner /> : "Accept"}
                    </Button>
                    <Button
                      className="bg-transparent cursor-pointer"
                      onClick={() => handleReject(request?._id, "rejected")}
                    >
                      {rejectLoading === request._id ? <Spinner /> : "Reject"}
                    </Button>
                  </CardFooter>
                </Card>
              </>
            );
          })
        ) : (
          store?.length === 0 ? <NotFound title="Requests" /> : <ShimmerUi/>
        )}
      </div>
    </>
  );
};
