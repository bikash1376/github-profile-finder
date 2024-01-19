import { useState } from "react";
import { RiLink, RiGithubFill } from "@remixicon/react";
import './App.css'

const UserFinder = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const findUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const userData = await response.json();
      setUserData(userData);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError("User not found");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      <label style={{ display: "block", margin: "20px 0", fontSize: "1.2em" }}>
        GitHub Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", fontSize: "1em" }}
        />
      </label>
      <button onClick={findUser} style={{ backgroundColor: "#405DE6", color: "white", padding: "10px", fontSize: "1em", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Find User
      </button>

      {userData && (
        <div style={{ marginTop: "20px" }}>
          <h2>User Details:</h2>
          <img src={userData.avatar_url} alt="" style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }} />
          <p style={{ fontFamily: "Source Code Pro, serif",fontSize: "1.2em", fontWeight: "600", margin: "10px 0" }}>@{userData.login}
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              <RiLink style={{ fontSize: "1.5em", color: "#405DE6", margin: "0 5px" }} />
            </a>
          </p>
          
          <p style={{ fontSize: "1em" }}>
            Joined:{" "}
            {new Date(userData.created_at)
              .toLocaleDateString()
              .replace(/\//g, " ")}
          </p>
          <div className="profile-data">
          <p style={{ fontSize: "1em" }}>Repos <span>{userData.public_repos}</span></p>
          <p style={{ fontSize: "1em" }}>Followers <span>{userData.followers}</span></p>
          <p style={{ fontSize: "1em" }}>Following <span>{userData.following}</span></p>
          </div>
          <button className="github-btn" style={{ backgroundColor: "#405DE6", color: "white", padding: "10px", fontSize: "1em", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>
            <a href={userData.html_url} style={{ color: "white", textDecoration: "none" }}>
              Github
              <RiGithubFill style={{ marginLeft: "5px" }} />
            </a>
          </button>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "20px", fontSize: "1em" }}>{error}</p>}
    </div>
    
  );
  
};


export default UserFinder;
