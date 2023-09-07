import axios from "axios";

const API_URL = "http://localhost:8000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  if (response.data) {
    await axios.post(
      "http://localhost:8000/api/currency/",
      { userID: response.data["_id"] },
      { withCredentials: true }
    );
    await axios.post(
      `http://localhost:8000/api/profile/set/${response.data["_id"]}`,
      {
        name: response.data["username"],
        user_id: response.data['_id']
      },
      { 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
        }
    );
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  return response.data;
};

const logout = async () => {
  const response = await axios.post(API_URL + "logout", {}, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });
}

// change user info
const changeUserPassword = async (userData) => {
  const response = await axios.patch(API_URL + 'changeUserPassword', userData, { withCredentials: true })

  return response.data
}

const checkCookie = async () => {
  const response = await axios.get(API_URL + "getToken", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  return response.data;
};

// export register and login functions
const authService = {
  register,
  login,
  changeUserPassword,
  logout,
  checkCookie,
};

export default authService;
