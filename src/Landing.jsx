import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { proxy } from "./utils";

const Landing = () => {
  const [isUser, setIsUser] = useState(false);
  const [displayName, setDisplayName] = useState();
  const checkUser = async () => {
    const res = await fetch(proxy + "/recognize-returning", {
      credentials: "include",
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success === true) {
      setIsUser(true);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  const changeHandler = (e) => {
    setDisplayName(e.target.value);
  };
  const handleSubmitUser = async (e) => {
    let data = new FormData();
    console.log(displayName);
    data.append("request", JSON.stringify({ newUser: displayName }));
    const res = await fetch(proxy + "/set-username", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      setIsUser(true);
      return;
    }
    window.alert("error setting username");
  };
  if (!isUser) {
    return (
      <div>
        <input
          placeholder="Enter a display Name"
          onChange={changeHandler}
          name="displayName"
        />
        <button onClick={handleSubmitUser}>Enter!</button>
      </div>
    );
  }
  return <Redirect to="/map" />;
};

export default Landing;
