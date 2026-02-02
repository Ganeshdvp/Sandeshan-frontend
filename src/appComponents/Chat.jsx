import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

export const Chat = () => {
  const { targetId } = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const store = useSelector((store) => store.user);
  const loggedInUserId = store?._id;

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
    socket.on("messageRecevied", ({firstName, ProfileImage,text})=>{
      setAllMessages((prev)=> [...prev, {firstName,ProfileImage, text}])
    })

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, targetId]);

  return (
    <>
      <div className="ml-[10%] w-[80%] h-130 flex flex-col">
        <div className=" w-full h-[90%]">
          <div className="flex flex-col items-center gap-x-2 w-fit p-2 rounded-2xl">
           {
            allMessages.map((msg,index)=>{
              return (
                <>
                <div key={index} className="flex items-center gap-x-2">
                  <Avatar>
              <AvatarImage src={msg.ProfileImage} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-white">{msg.text}</p>
                </div>
                </>
              )
            })
           }
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
            className="cursor-pointer bg-purple-700 p-1 pl-4 pr-4 rounded-2xl hover:bg-purple-800"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
