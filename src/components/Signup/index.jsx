import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase";
import Login from "../Login";
import Logo from '../../assets/img/logo_gray_bg.png';
import Api from '../../util/api.util'

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [signUpState, setSignUpState] = useState(true);

  const handleGoogleSignInClick = async (e) => {
    e.preventDefault();
    try {
      let tempUser = await auth.signInWithPopup(provider);
      await Api.SignupWithGoogle({email: tempUser.user.email, username: tempUser.user.displayName})
    } catch (errr) {
      console.log(errr);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let usernameRegex = /^[a-z0-9_-]{3,15}$/
    try {
      if (passRegex.test(password)) {
        if (emailRegex.test(email)){
          if (usernameRegex.test(username)){
            await auth.createUserWithEmailAndPassword(
              email,
              password
            );
            await auth.currentUser.updateProfile({
              displayName: username,
              photoURL: "https://picsum.photos/100",
            });
            await Api.SignupWithEmail({"email": email, "username": username})
          }else{
            throw new Error('Invalid username, please use only letters and numbers, no spaces')
          }
        }else{
          throw new Error("Invalid Email")
        }
      }else{
        throw new Error('Your password must contain at least 8 characters, lowercase and uppercase letters, numbers and a special digit')
      }
    } catch (error) {
      setMessage(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setEmail(value);
    }
  };

  return (
    <>
      {signUpState && (
        <SignUpContainer>
          <SignUpInsideContainer>
            <img src={Logo} alt='logo' height='60' style={{borderRadius: '8px'}}/>
            <h1>
              Sign-Up for <span>RB Crypt</span>
            </h1>
            <p>rb-crypt.web.app</p>
            <Button
              variant="contained"
              className="signingooglebtn"
              onClick={(e) => handleGoogleSignInClick(e)}
            >
              SignUp in with Google
            </Button>
            <SignUpFormContainer>
              <form onSubmit={(e) => handleSignUpSubmit(e)}>
                <TextField
                  id="input"
                  label="email"
                  variant="outlined"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="input"
                  value={email}
                />
                <TextField
                  id="outlined-basic"
                  name="username"
                  label="username"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                  className="username"
                  value={username}
                />
                <TextField
                  id="outlined-basic"
                  name="password"
                  label="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  className="input"
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                {message && <h5 style={{color: 'red', maxWidth: '230px'}}>{message}</h5>}
              </form>
              {message && <h6>{message}</h6>}
            </SignUpFormContainer>

            <SignUpTextContainer onClick={() => setSignUpState(false)}>
              Already a member? Sign In
            </SignUpTextContainer>
          </SignUpInsideContainer>
        </SignUpContainer>
      )}
      {signUpState == false && <Login />}
    </>
  );
}

export default Signup;

const SignUpContainer = styled.div`
  background-color: #f8f8f8;
  height: 92vh;
  display: grid;
  place-items: center;
`;

const SignUpFormContainer = styled.div`
  > form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    > Button {
      color: white;
      font-size: 15px;
      font-weight: 300;
      text-transform: inherit !important;
      background-color: #545454 !important;
      padding: 5px 10px;
    }
  }
  > h6 {
    margin-top: 5px;
    color: red;
    max-width: 50%;
    text-align: center;
    margin-left: 24%;
  }
  #input {
  }
  .input {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const SignUpTextContainer = styled.h4`
  margin-top: 20px;
  color: #545454;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const SignUpInsideContainer = styled.div`
  padding: 60px 50px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > svg {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > h1 > span {
    color: #545454;
  }
  > Button {
    color: white;
    margin-top: 30px;
    font-size: 15px;
    font-weight: 300;
    text-transform: inherit !important;
    background-color: #545454 !important;
    padding: 5px 10px;
    margin-bottom: 0;
  }
  > Button:hover {
    color: black;
  }
`;
