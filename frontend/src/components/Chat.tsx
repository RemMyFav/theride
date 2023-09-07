import { useEffect, useState } from "react";
import socket from "../features/socket/socket";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ userId, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userId,
        context: currentMessage,
        time: new Date(),
      };

      socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data.context);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="mt-4 grid h-[45vh] w-[110vh] grid-cols-1 grid-rows-chat justify-items-center gap-2 rounded-base bg-white p-4 shadow">
      <div className="w-[95%] overflow-x-hidden overflow-y-scroll rounded-base border border-black p-2">
        <ScrollToBottom className="h-full w-full">
          {messageList
            .filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (data) =>
                    data.userId === value.userId &&
                    data.context === value.context &&
                    data.time === value.time
                )
            )
            .map((messageContent, key) => {
              return (
                <div
                  key={key}
                  className="flex"
                  id={userId === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content m-1 rounded-base py-1 px-4">
                      <p>{messageContent.context}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="flex h-full w-full justify-center">
        <input
          className="block h-full w-[82.5%] rounded-base p-4 shadow-base"
          placeholder="Message..."
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          id="sendBtn"
          className="ml-[2.5%] w-[10%] rounded-full bg-prime text-white shadow-base disabled:opacity-75"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
