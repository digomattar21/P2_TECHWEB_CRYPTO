import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo1 from '../../assets/img/logo1.png'; 
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SettingsIcon from '@material-ui/icons/Settings';

function Navbar() {
  var history = useHistory();
  const [user,loading] = useAuthState(auth);

  return (
    <NavbarContainer>
      <AppBar position="static">
        <Toolbar className="navbar">
          <div>
            <img src={Logo1} alt='logo' height="40"/>
          </div>

          {user && (
            <div className="navbar-right">
            <Button type='button' className='settingsbtn'>
              <SettingsIcon />
            </Button>
            <Button className='signoutbtn' onClick={()=>auth.signOut()} >Log out</Button>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  

  .navbar {
    background-color: #545454;
    display: flex;
    justify-content: space-between;

    .settingsbtn{
      color: white;
    }

    .signoutbtn{
      color: white;
      background-color: #999999
    }

    >div{
      display: flex;
      align-items: center;
    }
  }

`;
