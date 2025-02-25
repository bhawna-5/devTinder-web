import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // New state for temporary edits
  const [editedProfile, setEditedProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age || "",
    gender: user.gender || "",
    about: user.about || "",
  });

  // State for saved profile (shown in UserCard)
  const [savedProfile, setSavedProfile] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        editedProfile,
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      // Update saved profile after successful save
      setSavedProfile(editedProfile);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={editedProfile.firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={editedProfile.lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    name="photoUrl"
                    value={editedProfile.photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    name="age"
                    value={editedProfile.age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    name="gender"
                    value={editedProfile.gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    name="about"
                    value={editedProfile.about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* UserCard uses savedProfile, NOT live edits */}
        <UserCard user={savedProfile} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
