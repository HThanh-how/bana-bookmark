import React, { useEffect } from "react";
import background from "./Assets/Images/Bahnaric2.png";
import Image from "./Assets/Images/Image.jpg";
import editPen from "./Assets/Images/editPen.svg"
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Dialog from "./Components/Dialog";
import BookMarkList from "./Components/BookMarkList";
import "./Components/BookMarkList";
import AuthService from "../src/AuthService";


function UserProfile() {

  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    const user = AuthService.getCurrentUser();
    if(user) {
      setCurrentUser(user);
    }
  })
  const [username, setUsername] = useState("{currentUser.username}");
  




    const [usernameError, setUsernameError] = useState("");
    const [name, setName]=useState("Old Name of New Man");
    const [phone, setPhone]=useState("0933377778");
    const [newPhone, setNewPhone]=useState("");
    const [newName, setNewName]=useState("");
    const [email, setEmail] = useState("sample@banhric.com");
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword]=useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [reenterPasswordError, setReenterPasswordError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [changeEmail, setChangeEmail] =useState(false);
    const [changeName, setChangeName]=useState(false);
    const [changePhone, setChangePhone]=useState(false);
    const [changePassword, setChangePassword]=useState(false);

    function closeDialog() {
    setOpenDialog(false);
  }
    const handleSignUp = (e) => {
        e.preventDefault();
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setOpenDialog(false);
        let error = false;
        if(username === "") {
            setUsernameError("Please provide a username");
            error = true;
        };
        if(newEmail === "")  {
            setEmailError("Please provide an email");
            error = true;
        }

        if(password === "") {
            setPasswordError("Please provide a password");
            error = true;
        } else if(password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            error = true;
        }
        if(reenterPassword === "") {
            setReenterPasswordError("Please re-enter your password");
            error = true;
        }
        if(password !== reenterPassword) {
            setPasswordError("Passwords do not match");
            setReenterPasswordError("Passwords do not match");
            error = true;
        }
        if(!error) {
            axios.post("http://localhost:5000/api/register", {
                "username" : username,
                "email_address": email,
                "password1" : password,
                "password2": reenterPassword
            }).then((response) => {
                console.log(response);
                if(response.data.err) {
                    for(let err of response.data.err) {
                        if(err.msg === "There was an error: ['Username exists!']") setUsernameError("Username already exists");
                        if(err.msg === "There was an error: ['Email exists!']") setEmailError("Email already exists");
                        if(err.msg === "There was an error: ['Invalid email address.']") setEmailError("Invalid email address");
                    }
                } else {
                    if(response.data.msg === "create success !!!!!") {
                        setOpenDialog(true);
                    }
                }
            })
        }
    }

  return (
  
    <div className="login">
      <div className="login_form">
        <>
          <p style={{ textAlign:'center'}}> <img src={Image} style={{alignContent:'center', width: "100px", borderRadius: "50%" }}></img></p>          
          {!changeName?
            <p className="auth_input" onDoubleClick={() => setChangeName(!changeName)} style={{ fontWeight: 'bold', textAlign:'center'}}>{name}
              {/* <img onClick={() => setChangeName(!changeName)} src={editPen} style={{height: '10px'}}></img> */}
            </p>:
            <div className="auth_input">
              <input type="email" placeholder="Enter your new name" onChange={(e) => {setNewName(e.target.value); } }></input>
              <p><u align="right" onClick={() => {setChangeName(!changeName);setName(newName)}}>Save</u>&emsp; <u align="right" onClick={() => setChangeName(!changeName)}>Cancel</u></p>
            </div>
          }
          <p className="auth_input" style={{fontWeight: 'lighter', textAlign:'center'}}>@username</p>
        </>
      


        <form>
           <p className="auth_input" > Words learned: </p> 
           <p className="auth_input"> Words being learn: </p>
           <p className="auth_input"> Wish list:  </p>  

          <div className="auth_input">
            <label htmlFor="email">Email</label>
            {!changeEmail? 
              <p>{email}&emsp; <u align="right" onClick={() => setChangeEmail(!changeEmail)}>Edit</u></p>:<>
              <input type="email" placeholder="Enter your new email" onChange={(e) => {setNewEmail(e.target.value); } }></input>
              {emailError != "" && <span className="error">{emailError}</span>}
              <p><u align="right" onClick={() => {setChangeEmail(!changeEmail);setEmail(newEmail)}}>Save</u>&emsp; <u align="right" onClick={() => setChangeEmail(!changeEmail)}>Cancel</u></p></>
              }
          </div>

          <div className="auth_input">
            <label>Phone Number</label>
            {!changePhone? 
              <p>{phone}&emsp; <u align="right" onClick={() => setChangePhone(!changePhone)}>Edit</u></p>:<>
              <input type="text" placeholder="Enter your new phone" onChange={(e) => {setNewPhone(e.target.value); } }></input>
              {/* {phoneError != "" && <span className="error">{phoneError}</span>} */}
              <p><u align="right" onClick={() => {setChangePhone(!changePhone);setPhone(newPhone)}}>Save</u>&emsp; <u align="right" onClick={() => setChangePhone(!changePhone)}>Cancel</u></p></>
            }
          </div>
          {!changePassword?
          <div className="submit">
            <button onClick={() =>{setChangePassword(!changePassword)}}>Change Password</button>
          </div>:

          <>
          <div className="auth_input">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your new password" onChange={(e) => {setNewPassword(e.target.value)}}></input>
            {passwordError != "" && <span className="error">{passwordError}</span>}
          </div>
          <div className="auth_input">
            <label htmlFor="password">Re-enter new password</label>
            <input type="password" placeholder="Reenter new password" onChange={(e) => {setReenterPassword(e.target.value)}}></input>
            {reenterPasswordError != "" && <span className="error">{passwordError}</span>}
          </div>
          <p><u align="right" onClick={() => {setChangePassword(!changePassword);setPassword(newPhone)}}>Save</u>&emsp; <u align="right" onClick={() => setChangePassword(!changePassword)}>Cancel</u></p>
          </>}
        </form>
        
      </div>
      <div> 
      <BookMarkList api={"http://127.0.0.1:5000/api/bookmark"}/>
      </div>
      {/* <img src={background} className="background"></img> */}
    </div>


   
  );
}

export default UserProfile;
