import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    try {
      await axios.post("/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      alert("User created successfully. It's time to log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Create Account</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          {/* FIRST NAME */}
          <label>Enter First Name</label>
          <input
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          {/* LAST NAME */}
          <label>Enter Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          {/* USERNAME */}
          <label>Enter Username</label>
          <input
            type="text"
            placeholder="JDoe"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* EMAIL */}
          <label>Enter Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* PASSWORD */}
          <label>Enter Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* CREATE BUTTON */}
          <button className="primary">Create Account</button>
          {/* LOGIN LINK */}
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
