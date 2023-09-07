import axios from "axios";
import ProfileData from "./ProfileData";

const API_URL = "http://localhost:8000/api/profile/";

// set empty profile of name=user.username
const setProfile = async (profileData: ProfileData) => {
  const response = await axios.post(API_URL+'set/'+profileData.user_id, 
  {name: profileData.name});

  return response.data;
};

// Get profile
const getProfile = async (profileData: ProfileData) => {
  if (!profileData.user_id) return new Error('no user id provided');
  const response = await axios.get(API_URL+profileData.user_id, {
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Credentials": true,
    //   "Access-Control-Allow-Origin": "*",
    // },
    withCredentials: true,
  });
  
  return response.data;
};

// Update profile
const updateProfile = async (profileData: ProfileData) => {
    if (!profileData.user_id) return new Error('no user id provided');
    console.log(profileData)
  const response = await axios.post(API_URL+'update/'+profileData.user_id, profileData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });
  
  return response.data;
};

  const profileService = {
    setProfile,
    getProfile,
    updateProfile,
  };
  
  export default profileService;