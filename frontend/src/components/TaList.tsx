import { useEffect, useState } from "react";

import Rating from "./Rating";
import { joinQuestion } from "../features/socket/socket";

function Comment({ question, taInfo }) {
  let comment = "";
  for (let i = 0; i < question.taID.length; i++) {
    if (question.taID[i]._id === taInfo.user_id) {
      comment = question.taID[i].comment;
      break;
    }
  }

  return (
    <div className="grid comment_container justify-start gap-1">
      <div className="justify-self-start test-bold italic text-gray-600">{taInfo.name}</div>
      <div className="truncate">{comment}</div>
    </div>
  );
}

function TaList({ question, setRoom }) {
  const [taList, setTaList] = useState([]);

  useEffect(() => {
    question.taID.forEach((feedback) => {
      fetch(`http://localhost:8000/api/profile/${feedback._id}`, {
        method: "GET",
        cache: "default",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTaList((prevData) => [...prevData, data]);
        })
        .catch((error) => console.error(error));
    });
  }, [question]);

  return taList
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (data) => data.user_id === value.user_id && data.name === value.name
        )
    )
    .map((ta, key) => (
      <div
        key={key}
        className="ta_container mt-2 grid gap-4 h-24 w-[110vh] items-center rounded bg-white p-2 shadow-base"
      >
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray text-white shadow-base">
            {ta.name.charAt(0).toUpperCase()}
          </div>
          <Rating rating={ta.rating} />
        </div>
        <Comment question={question} taInfo={ta} />
        <button
          className="btn ml-auto bg-prime px-4 text-white"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const room = {
              questionID: question._id,
              taID: ta.user_id,
            };
            setRoom(room);
            joinQuestion(question.userID, room);
          }}
        >
          Chat
        </button>
      </div>
    ));
}

export default TaList;
