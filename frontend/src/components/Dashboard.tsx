import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/post/postSlice";

import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NewQuestion from "./NewQuestion";
import ContentList from "./questions";
import SearchBar from "./search";
import Question from "./question";
import Profile from "./Profile";
import MyQuestion from "./MyQuestion";
import MyQuestionList from "./MyQuestionList"
import Demo from "./currencyList";

interface UserData {
  _id: string;
  name: string;
  email: string;
  token: string;
}

function Welcome() {
  // get the user's data
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <span className="text-6xl font-bold"> Welcome back </span> <br />
      <span className="text-6xl font-bold text-prime">
        {" "}
        {user && user.username}{" "}
      </span>
    </>
  );
}

function QuestionPanel() {
  return (
    <div className="overflow-scroll">
      <div className=" flex justify-center">
        <div className="fixed z-20 flex h-12 w-full items-center justify-center bg-bg shadow">
          <SearchBar />
        </div>
        <div className="mt-14">
          <ContentList />
        </div>
      </div>
    </div>
  );
}

function MyQuestionPanel() {
  return (
    <div className="overflow-scroll">
      <div className=" flex justify-center">
        <div className="mt-4">
          <MyQuestionList />
        </div>
      </div>
    </div>
  );
}


function Dashboard() {
  return (
    <>
      <Router>
        <div className="flex">
          <Routes>
            <Route path="*" element={<Sidebar />}></Route>
          </Routes>
          
          <div className="relative top-[3.5rem] left-[16.666667%] grid h-[90vh] w-5/6 content-center justify-center">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/questions/postQuestion" element={<NewQuestion />} />
              <Route path="/questions/" element={<QuestionPanel />} />
              <Route path="/MyQuestions/" element={<MyQuestionPanel />} />
              <Route path="/currency" element={<Demo />} />
              <Route
                exact
                path="/MyQuestions/:id/q_id/:question_id"
                element={<MyQuestion />}
              />
              <Route
                exact
                path="/questions/:id/q_id/:question_id"
                element={<Question />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default Dashboard;
