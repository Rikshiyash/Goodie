"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomeHeader";
import UserSignup from "../_components/UserSignup";
import UserLogin from "../_components/UserLogin";
import CustomerFooter from "../_components/CustomerFooter";

const UserAuth = (props) => {
  const [login, setLogin] = useState(false);
  console.log(props)

  return (
    <>
      {/* Header */}
      <CustomerHeader />

      {/* Auth Form */}
      {login ? <UserLogin redirect={props.searchParams} /> : <UserSignup   redirect={props.searchParams} />}

      {/* Toggle Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => setLogin(!login)}
          className="text-blue-600 underline hover:text-blue-800 transition-all duration-300 text-xl"
        >
          {login
            ? "Don’t have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>

      {/* Footer */}
    
    </>
  );
};

export default UserAuth;
