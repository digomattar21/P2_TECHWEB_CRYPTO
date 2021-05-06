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

  const handleWatchlistClick = (e)=>{
    history.push('/watchlist')
  }

  const handleHomeClick = ()=>{
    history.push('/')
  }

  return (
    <NavbarContainer>
      <AppBar position="static">
        <Toolbar className="navbar">
          {!user && (
            <div>
              <img onClick={()=>handleHomeClick()} src={Logo1} alt='logo' height="40"/>
            </div>
          )}
          {user && (
            <>
            <div>
            <img onClick={()=>handleHomeClick()} src={Logo1} alt='logo' height="40"/>
            <h4 
            className="watchlist-link"
            onClick={(e)=>handleWatchlistClick()}
            
            >Watchlist</h4>
          </div>
            <div className="navbar-right">
            <Button type='button' className='settingsbtn'>
              <SettingsIcon />
            </Button>
            <Button className='signoutbtn' onClick={()=>auth.signOut()} >Log out</Button>
          </div>
          </>
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
    .watchlist-link{
      :hover{
        opacity: 0.7;
        cursor: pointer;
      }
    }

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
      >img{
        :hover{
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }

`;
