import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (event) => {
    event.preventDefault();

    const user = { identifier, password };

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json()

    if (data.ok) {
      setIdentifier("");
      setPassword("");
      alert("Logged In Successfully :))");
      router.replace("/dashboard");
    } else {
      alert(data.message)
    }

  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Username | Email</label>
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
          className="register-btn"
          value="Sign In"
          onClick={signIn}
        />
      </form>
    </div>
  );
}

export default Index;
