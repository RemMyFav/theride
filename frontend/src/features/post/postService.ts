import axios from "axios";
import QuestionData from "./QuestionData";

const API_URL = "http://localhost:8000/api/questions/";

const setQuestion = async (questionData: QuestionData) => {
  const currencyState = await axios.patch(  
    "http://localhost:8000/api/currency/" +
      "subtract/" +
      questionData["userID"],
    { userID: questionData["userID"], amount: questionData["bounty"] },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );

  if ("message" in currencyState.data && currencyState.data["message"] !== "") {
    return currencyState.data;
  }

  const response = await axios.post(
    API_URL + questionData["userID"],
    questionData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const acceptQuestion = async (taInfo)=> {
  console.log(taInfo);
  const response = await axios.put(
    API_URL + taInfo.taId + "/acceptQuestion/" + taInfo.questionId,
		{
			comment: taInfo.comment,
		}
  )
  return response.data;
}

const postService = {
  setQuestion,
  acceptQuestion,
};

export default postService;
