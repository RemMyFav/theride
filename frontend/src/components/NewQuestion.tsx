import { RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { HiSelector } from "react-icons/hi";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion, reset } from "../features/post/postSlice";
import { toast } from "react-toastify";
import QuestionData from "../features/post/QuestionData";

export default function NewQuestion() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [bountyAmount, setBountyAmount] = useState("");
  const [category, setCategory] = useState("other");

  const categories = [
    "computer science",
    "math",
    "physics",
    "chemistry",
    "biology",
    "extracurricular",
    "other",
  ];

  const { user } = useSelector((state) => state.auth);
  const userID: string = user["_id"];
  const dispatch = useDispatch();
  const { question, isLoding, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      location = "/";
    }

    dispatch(reset());
  }, [question, isError, isSuccess, isLoding, message, dispatch]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let bounty: number = parseInt(bountyAmount);

    const questionData: QuestionData = {
      title,
      body,
      userID,
      bounty,
      category,
    };

    dispatch(setQuestion(questionData));
  };

  return (
    <div>
      <form
        className="m-10 grid h-[42rem] w-[60rem] max-w-full grid-cols-1 grid-rows-addQuestion justify-items-center gap-2 rounded-base bg-white p-8 shadow-base"
        onSubmit={handleSubmit}
      >
        <div className="flex h-8 w-[85%] rounded">
          <input
            type="text"
            className="mr-1 h-full w-[85%] border border-solid border-black p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative h-full w-[15%] rounded bg-prime">
            <label
              htmlFor="category"
              className="flex items-center justify-center text-white p-2 text-xl"
            >
              <div className="text-[10px] leading-[8px]">{category}</div>
              <HiSelector className="ml-auto block" />
            </label>
            <input type="checkbox" id="category" className="hidden" />
            <div
              id="catelist"
              className="absolute grid hidden h-[14rem] w-[7.2rem] grid-cols-7 bg-bg text-sm shadow"
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="dropdown-category w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory(categories[index]);
                    document.getElementById("category").checked = false;
                  }}
                >
                  {categories[index]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <textarea
          className="w-[85%] rounded border border-solid border-black p-2"
          placeholder="Describe your questions..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className=" h-[32px] w-[85%]">
          <button
            className="btn float-left bg-bg text-gray"
            onClick={(e) => {
              e.preventDefault();
              setTitle("");
              setBody("");
              setBountyAmount("");
            }}
          >
            <RxCross2 className="mr-2 rounded-full border border-gray" />
            Clear
          </button>

          <div
            id="pubBox"
            className="btn float-right flex items-center justify-center p-0"
          >
            <input
              type="text"
              id="bounty"
              className="relative left-7 h-full w-0 rounded-l-full bg-transparent outline-none transition-all duration-1000  ease-in-out"
              placeholder=" "
              maxLength="4"
              value={bountyAmount}
              onChange={(e) => setBountyAmount(e.target.value)}
            />
            <AiOutlineDollar
              id="dollar"
              className="relative -left-12 h-0 w-0 text-lg text-prime transition-all delay-150 duration-500 ease-in-out"
            />
            <button id="publish" className="btn bg-prime text-white">
              <RiSendPlaneFill className="mr-2" />
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
