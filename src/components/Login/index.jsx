import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase";
import SignUp from '../Signup';
import LogoGray from '../../assets/img/logo_gray_bg.png'
import { useHistory } from 'react-router';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(true);
  const history = useHistory();
  const [message, setMessage] = useState(null);

  const handleGoogleSignInClick = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithPopup(provider);
      setTimeout(()=>{
        history.push('/')
      },200)
    } catch (errr) {
      console.log(errr);
    }
  };
  const handleLoginSubmit = async (e)=>{
      e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email,password);
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error);
      setMessage(error.message)
    }

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <>
    {loginState && (
      <LoginContainer>
      <LoginInsideContainer>
        <img src={LogoGray} alt='logo' height='60' style={{borderRadius: '8px'}}/>
        <h1>
          Sign-in to <span>RB Crypt</span>
        </h1>
        <p>rb-crypt.web.app</p>
        <LoginFormContainer>
        <Button className="signingooglebtn" variant='contained' onClick={(e) => handleGoogleSignInClick(e)}>
          Sign in with Google
        </Button>
          <form onSubmit={(e)=>handleLoginSubmit(e)}>
            <TextField
              id="input"F
              label="email"
              variant="outlined"
              name="email"
              onChange={(e) => handleChange(e)}
              className='input'
            />
            <TextField
              id="outlined-basic"
              name="password"
              label="password"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              className='input'
            />
            <Button type="submit" variant="contained">
                  Submit
            </Button>
            {message && <h5 style={{color: 'red', maxWidth: '230px'}}>{message}</h5>}
          </form>
        </LoginFormContainer>

        <SignUpTextContainer onClick={()=>setLoginState(false)}>
          New to RB Crypt? SignUp
        </SignUpTextContainer>

        
      </LoginInsideContainer>
    </LoginContainer>
    )}
    {!loginState &&(
      <SignUp />
    )}
    </>
    
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 92vh;
  display: grid;
  place-items: center;
`;

const LoginFormContainer = styled.div`
> Button {
    color: white;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 300;
    text-transform: inherit !important;
    background-color: #545454 !important;
    padding: 5px 10px;
  }
  > form {
    display: flex;
    flex-direction: column;
    margin-top: 10px
  }
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
  }}
    .input{
      margin-top: 15px;
      margin-bottom: 15px;
    }
`;

const SignUpTextContainer = styled.h4`
  margin-top: 20px;
  color: #545454;
  :hover{
    opacity:0.8;
    cursor: pointer;
  }
`;

const LoginInsideContainer = styled.div`
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
  
  > Button:hover {
    color: black;
  }
`;
