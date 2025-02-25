import React from "react";

const UserCard = ({ user }) => {
  if (!user) return <div>Loading...</div>; // Fallback during initial load

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={user.photoUrl} // Fallback image
          alt={user.firstName || "User"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>{user.age + " " + user.gender}</p>
        <p>{user.about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondry">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
