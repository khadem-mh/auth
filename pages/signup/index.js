import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const router = useRouter();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (event) => {

    event.preventDefault()

    const user = { firstName, lastName, userName, email, password };

    const res = await fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const result = await res.json()

    if (result.ok) {
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");

      alert("Registered Successfully :))");

      router.replace("/dashboard");

    } else {
      alert(result.message)
    }

  };

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstname(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastname(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            value={userName}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          value={"Signup"}
          className="register-btn"
          onClick={signup}
        />
      </form>
    </div>
  );
}

export default Index;
