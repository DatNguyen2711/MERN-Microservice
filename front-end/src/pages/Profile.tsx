import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import data from "../data.json";
import clip1 from "../assets/clip-01.jpg";
import clip2 from "../assets/clip-02.jpg";
import clip3 from "../assets/clip-03.jpg";
import clip4 from "../assets/clip-04.jpg";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpg";
import { useState, useEffect, Fragment } from "react";
function Profile() {
  const [user, setUser] = useState({});
  const apiUrl = process.env.API_URL_USER;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${apiUrl}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
          });
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  // var image = profile;
  // if (data.gender === "female") {
  //   image = profileg;
  // }
  return (
    <Fragment>
      <NavBar />
      <div className="widt"></div>
    </Fragment>
  );
}
export default Profile;
