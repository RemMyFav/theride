import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changeUserPassword, reset } from "../features/auth/authSlice";
import { setProfile, updateProfile } from "../features/profile/profileSlice";
import ProfileData from "../features/profile/ProfileData"; 


// id is the username
// render profile Image
function Image({image, text}) {
  console.log('image')
  console.log(image);

  if (!image) {
    return (
      <label className="flex cursor-pointer items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-base bg-gray text-white shadow-base">
            {text}
          </div>
        </label>
    );
  } else {
    //   urltoFile(image, 'a', 'png')
    //   .then(function(res){
    //     image=res
    // })
    console.log(image)

    return (
      <div>
        <img src={`data:image/jpeg;base64, ${image}`} 
        style={{height: "100px", width: "100px", borderRadius: "100%"}} 
        alt="user profile image"/>
      </div>
    );
  }
}

const ImagetoBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

function Profile(props) {
  const [name, setProfileName] = useState('');
  const [current_name, setCurrentName] = useState(''); // current name
  const [rating, setRating] = useState(0); // read only
  const [image, setImage] = useState<string>(""); // image in profile
  const [current_image, setCurrentImage] = useState<String>(""); // current image
  var posted_questions: string[] = []; // read only
  var answered_questions: string[] = []; // read only

	// set user password change required data
	// const [username, setUsername] = useState(user.username);
	// const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { profile, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.profile
  );

  const { user , isLogin } = useSelector(
    (state) => state.auth
  );

  // set user's data to Database
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      // notify error message
      toast.error(message);
    }

    // reset state after user's operation
    // dispatch(reset());
  }, [profile, isError, isSuccess, message, dispatch]);

  // on mount get profile data
  useEffect(() => { //${user._id}64138ae22a05b448db9251b1
    if (isLogin) {
    fetch(`http://localhost:8000/api/profile/${user._id}`,
    {
      method: 'GET',
      cache: 'default',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        var message = data['message'];
        if (!message) {
            console.log(data)
            setProfileName(data['name']);
            if (data['image']) {
              setImage((data['image']));
            }
            setRating(data['rating']);
            answered_questions = data['answered_questions'];
            posted_questions = data['posted_question'];
            console.log(user._id, name, rating);
        } else {
            toast.info('no profile found for this user, creating default profile.');
            setProfileName(user.username);
            const profileData: ProfileData = {
              name: user.username,
              user_id: user._id,
            };
            console.log(profile)
            dispatch(setProfile(profileData));
        }
      }).catch(error => console.error());
		}}, [user, dispatch]);

  // whenever we get profile name, we initialize the current name
  useEffect(() => {
    setCurrentName(name);
  }, [name]);

  // useEffect(() => {
  //   setImage(current_image);
  // }, [current_image]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("password is changing");
    if (
      password == "" ||
      confirmPassword != password
    ) {
      toast.error("nothing has changed");
    } else {
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        password
      };
      console.log("userdata");
      console.log(userData);
      dispatch(changeUserPassword(userData));
    }
  };

  const handleChangeProfile = (e) => {
    e.preventDefault();
    console.log("profile is changing");
    console.log(name, current_name);
    if (
      name == current_name && current_image === ''
    ) {
      toast.error("nothing has changed");
    } else {

      const profileData: ProfileData = {
        name: current_name,
        user_id: user._id,
        image: current_image,
      };
      
      console.log('profile state');
      console.log(profileData);
      profileData['image'] = current_image.slice(22);
      dispatch(updateProfile(profileData));
    }
  };

  console.log(profile)
  const profile_pic_default = user.username === null ? "" : user.username.charAt(0).toUpperCase();
  return (
    <div className="absolute top-[3.5rem] w-5/6 grid content-center flex-col justify-center flex gap-4">
        <div className="ml-10 text-3xl flex-initial text-left font-extrabold">My Profile</div>
        <div className=" gap-4 bg-white p-10 shadow-base rounded-base">
          <div className="px-4 py-5 sm:px-6">
            <div className="text-base font-semibold leading-6 text-gray-900 text-left">
              Profile Information
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-extra-bold">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {!profile ? name : profile.name}
                </dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium flex justify-center align-items-center font-extra-bold">Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-center">
                  <Image image={!profile ?  image : profile.image} text={profile_pic_default}/>
                </dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium flex justify-center align-items-center font-extra-bold">Rating</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-center">
                  {rating}/5
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="gap-4 bg-white p-10 shadow-base rounded-base">
            <div className="ml-3 mb-5 text-xl text-left font-extrabold">Change Profile Information</div>
            <form className="flex gap-6 bg-white items-center justify-between" onSubmit={handleChangeProfile}>
                <div className="">
                    <div className="input_container">
                        <input
                            type="name"
                            id="profilename"
                            value={current_name}
                            onChange={(e) => setCurrentName(e.target.value)}
                            placeholder=" "
                            autoComplete="off"
                            className="input_panel"
                        />
                        <label htmlFor="profilename" className="input_label">
                            Change Profile Name
                        </label>
                        </div>
                        <div className="input_container">
                            <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => {
                              const mage = e.target.files[0]
                              if (!mage) {
                                toast.error('image is required');
                                setCurrentImage('')
                                e.target.value = ''
                                return false;
                              }
                              if (!mage.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                                toast.error('select valid image');
                                setCurrentImage('')
                                e.target.value = ''
                                return false;
                              }
                              ImagetoBase64(mage)
                              .then(data => {
                                console.log('dasf') 
                                console.log(data)
                                setCurrentImage(data)
                                console.log('current_iamge ', current_image)
                              })
                              .catch(err => toast.error(err));
                              // setCurrentImage(mage)

                            }}
                            placeholder=" "
                            autoComplete="off"
                            className="input_panel"
                            />
                            <label htmlFor="image" className="input_label">
                            Change Profile Picture
                            </label>
                            </div>
                </div>
                <div className="relative my-5 grid h-12 w-[12rem] place-items-center items-center rounded-base shadow-base">
                <button
                    type="submit"
                    className="h-full w-full rounded-base bg-prime font-bold text-white"
                >
                    Save
                </button>
                </div>
            </form>
        </div>
        <div className="gap-4 bg-white p-10 shadow-base rounded-base">
            <div className="ml-3 mb-5 text-xl text-left font-extrabold">Password</div>
            <form className="flex gap-6 bg-white items-center justify-between" onSubmit={handleChangePassword}>
                <div>
                    <div className="input_container">
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                        autoComplete="off"
                        className="input_panel"
                        />
                        <label htmlFor="password" className="input_label">
                        Change Password
                        </label>
                    </div>
                    <div className="input_container">
                        <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=" "
                        autoComplete="on"
                        className="input_panel"
                        />
                        <label htmlFor="confirmPassword" className="input_label">
                        Confirm New Password
                        </label>
                    </div>
                </div>
                <div className="relative my-5 grid h-12 w-[12rem] place-items-center items-center rounded-base shadow-base">
                    <button
                        type="submit"
                        className="h-full w-full rounded-base bg-prime font-bold text-white"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
export default Profile;
