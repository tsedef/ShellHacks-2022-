import React from "react";
import { Link } from "react-router-dom";
import { useFullContext } from "../hooks/useFullContext";
import logo from "../public/logo.png";

import styles from "./Landing.module.css";
function Landing() {
  const { user, events, authIsReady } = useFullContext();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={logo} />
      </div>
      <ul className={styles.profiles}>
        {user.length &&
          user[0]?.lName &&
          [...user].map((profile) => (
            <li>
              <figure>
                <img src={user.img} />
                <figcaption>{profile.userName}</figcaption>
              </figure>
            </li>
          ))}
      </ul>
      <div className={styles.left}>
        <nav>
          <ul>
            <li>Home</li>
            <li>Friends</li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>Events</li>
            <li>Music</li>
            <li>Let's Meet</li>
          </ul>
        </nav>
      </div>
      <div className={styles.left_btm}>
        <strong>Mobile App</strong>
        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"></img>
      </div>

      <div className={styles.right}></div>
    </div>
  );
}

export default Landing;
