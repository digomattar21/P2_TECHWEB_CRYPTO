import React, { useEffect } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from './components/Navbar';
import { auth } from './firebase';
import Loading from './components/Loading';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Watchlist from './components/Watchlist';
import Graph from './components/Graph';

function App() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  if (loading){
    return <Loading />
  }

  return (
    <div className="App">
    
      <Router>
        {user? (
          <>
            <Navbar/>
            <AppBody>
              <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path ='/watchlist' component={Watchlist}/>
                <Route exact path ='/graph' component={Graph}/>
              </Switch>
            </AppBody>
          </>
        ):(
          <>
            <Navbar/>
            <Login/>
          </>
        )}
        
      </Router>

    </div>
  );
}

export default App;

const AppBody = styled.div`
  heigh: 100vh;
  display: flex;
`;
