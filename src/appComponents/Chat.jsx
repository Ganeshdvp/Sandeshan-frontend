import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useOnlineStatus } from '../utils/useOnlineStatus';

export const Chat = () => {
  const { targetId } = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const store = useSelector((store) => store.user);
  const loggedInUserId = store?._id;
  const autoScrollRef = useRef(null);
  const [targetName , setTargetName] = useState("");
  const onlineStatus = useOnlineStatus();

  // fetch chat
  const fetchingChatData = async () => {
    try {
      const chat = await axios.get(BASE_URL + `/chat/${targetId}`, {
        withCredentials: true,
      });
      const filterData = chat?.data?.data?.messages.map((msg) => {
        return {
          loggedInUserId: msg?.senderId?._id,
          firstName: msg?.senderId?.firstName,
          ProfileImage: msg?.senderId?.ProfileImage,
          text: msg?.text,
        };
      });
      setAllMessages(filterData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchingChatData();
  }, []);

  // send message
  const handleSend = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: store?.firstName,
      ProfileImage: store?.ProfileImage,
      loggedInUserId,
      targetId,
      text: message,
    });
    setMessage("");
  };

  // making socket connection
  useEffect(() => {
    if (!store) return;
    // establish the connection and joined in chat
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: store?.firstName,
      ProfileImage: store?.ProfileImage,
      loggedInUserId,
      targetId,
    });
    // listening messages
    socket.on(
      "messageRecevied",
      ({ loggedInUserId, firstName, ProfileImage, text }) => {
        setAllMessages((prev) => [
          ...prev,
          { loggedInUserId, firstName, ProfileImage, text },
        ]);
      },
    );

    socket.on("joinedRoom", ({targetName})=>{
      setTargetName(targetName);
    })

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, targetId]);

  //auto scrolling
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <>
      <div className="ml-[25%] w-[50%] h-15 flex items-center pl-6 gap-x-2 shadow-[10px_10px_500px_rgba(100,100,500,0.55)]">
        <div className="flex items-end">
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {onlineStatus === true ? <span className="w-2 h-2 -ml-2 z-10 bg-green-600 border border-green-600 rounded-full inline-block"></span> : ""}
        </div>
        <p className="text-white">{targetName}</p>
      </div>
      <div className=" ml-[10%] w-[80%] h-130 flex flex-col">
        <div className="mx-auto w-[60%] h-[90%] rounded-2xl flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            {allMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg?.loggedInUserId === targetId
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] flex items-center gap-2 p-3 text-white shadow-md ${
                    msg?.loggedInUserId === targetId
                      ? "bg-gray-900 rounded-r-2xl rounded-tl-2xl"
                      : "bg-gray-900 rounded-l-2xl rounded-tr-2xl flex-row-reverse"
                  } hover:scale-[1.02] transition-transform duration-200
`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg?.ProfileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <p className="text-sm leading-relaxed warp-break-words">
                    {msg?.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={autoScrollRef} />
          </div>
        </div>

        <div className="mx-auto border p-4 rounded-4xl sm:w-[60%] text-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="w-[70%] md:w-[90%]  outline-none"
          />
          <button
            className="cursor-pointer bg-gray-800 p-1 pl-4 pr-4 rounded-2xl hover:bg-gray-900"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
