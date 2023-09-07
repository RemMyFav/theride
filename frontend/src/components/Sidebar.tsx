import { useState } from "react";
import {Link, } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import {
  BsTags,
  BsAward,
  BsQuestionCircle,
  BsChat,
  BsHeart,
} from "react-icons/bs";
import {
    GiGraduateCap,
} from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
function Sidebar() {
  const [activeId, setActiveId] = useState("");

  return (
    <div className="fixed top-[3.625rem] z-40 h-[93.5vh] w-1/6 bg-white">
      <div className="grid justify-start justify-items-start py-8 px-2 text-base">
        <div className="text-gray-font">MENU</div>
        <button
          className={activeId === "questions" ? "side-actived" : "side-section"}
          onClick={() => {
            setActiveId("questions");
            location.href = "/questions/";
          }}
        >
          <AiOutlineBars className="side-icon" />
          Questions
        </button>
        <button
          className={activeId === "tags" ? "side-actived" : "side-section"}
          onClick={() => setActiveId("tags")}
        >
          <BsTags className="side-icon" />
          Tags
        </button>
        <button
          className={activeId === "tutors" ? "side-actived" : "side-section"}
          onClick={() => setActiveId("tutors")}
        >
          <BsAward className="side-icon" />
          Tutors
        </button>
        <div className="h-8"></div>
        <div className="text-gray-font">PERSONAL NAVIGATOR</div>
        <button
          className={activeId === "y-q" ? "side-actived" : "side-section"}
          onClick={() => {
	    setActiveId("y-q");
	    location.href = "/MyQuestions/"
	  }}
        >
          <BsQuestionCircle className="side-icon" />
          My Questions
        </button>
        <button
          className={activeId === "y-a" ? "side-actived" : "side-section"}
          onClick={() => setActiveId("y-a")}
        >
          <BsChat className="side-icon" />
          My Answers
        </button>

        <button
          className={activeId === "y-lv" ? "side-actived" : "side-section"}
          onClick={() => setActiveId("y-lv")}
        >
          <BsHeart className="side-icon" />
          My likes & votes
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
