import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import signOutImg from "../assets/sloth.jpg";


const SignOut: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (err) {
      console.error("Error signing out:", (err as Error).message);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={signOutImg}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Sign Out</h1>
            <p className="py-6">
              Leaving already? The words will miss you.
            </p>
            <button className="btn btn-primary" onClick={handleSignOut}>Yes, vanish me</button>
            <button className="btn btn-primary" onClick={handleCancel}>No, take me back</button>
          </div>
        </div>
      </div>
    

    {/* <div className="container minimalisticWithBigImg">
      <div className="minimalistic_content">
        <img
          src={signOutImg}
          className="big-img"
          loading="lazy"
          alt="How about no Icon"
        />
      </div>
      <div className="textToBtnMinimalVibe">
        <h2>Are you sure you want to sign out?</h2>
        <div className="btn_row">
          <button onClick={handleSignOut} className="btn">Yes</button>
          <button onClick={handleCancel} className="btn">No</button>
        </div>
      </div>
    </div> */}
    </>

  );
};

export default SignOut;