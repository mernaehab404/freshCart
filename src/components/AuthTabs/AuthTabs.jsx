import  { useState } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";


export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-75 m-auto my-5">
      {/* Tabs */}
      <ul className="nav nav-pills mb-4 justify-content-center gap-3">
        <li className="nav-item">
          <button
            className={`nav-link px-5 ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link px-5 ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div>
        {activeTab === "login" && <SignIn />}
        {activeTab === "register" && <SignUp />}
      </div>
    </div>
  );
}
