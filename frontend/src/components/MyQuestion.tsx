import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineDollar } from "react-icons/ai";

import Chat from "./Chat";
import TaList from "./TaList";

const Question = () => {
  const { id, question_id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState({
    _id: "",
    title: "",
    body: "",
    category: "",
    bounty: "",
    user: "",
    taID: [],
  });

  const [room, setRoom] = useState({});

  const [error, setError] = useState(null);

  useEffect(() => {
    if (question_id) {
      // only fetch question if question_id exists
      fetch(
        `http://localhost:8000/api/questions/${user["_id"]}/q_id/${question_id}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch question");
        })
        .then((data) => {
          setQuestion(data[0]);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [question_id]);
	
  if (error) {
    return <div>Error: {error}</div>;
  }

  // render question details
  return (
    <>
      <div className="grid h-[40vh] w-[110vh] grid-cols-1 grid-rows-question gap-y-2 rounded-base bg-white p-8 text-3xl shadow">
        <div className="flex items-center mb-4">
          <div className="text-bold mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-gray text-white shadow">
            <div>
              {question.category
                ? question.category.charAt(0).toUpperCase()
                : "O"}
            </div>
          </div>
          <div>{question.title}</div>
        </div>
        <hr className="text-black" />
        <div className="overflow-auto text-ellipsis text-left text-xl ">
          <div className="whitespace-normal break-words">{question.body}</div>
        </div>
        <hr className="text-black" />
        <div className="mt-4 flex items-center">
          <div className="justify-self-start text-xl text-gray">
            #{question.category}
          </div>
          <div className="text-bold ml-auto flex items-center justify-center rounded-full bg-prime px-4 py-1 text-white">
            <AiOutlineDollar className="mr-2" />
            <span>{question.bounty}</span>
          </div>
        </div>
      </div>
      {Object.keys(room).length == 0 ? (
	<TaList question={question} setRoom={setRoom}/>
      ) : (
	<Chat userId={user._id} room={room} />
      )}
    </>
  );
};

export default Question;
