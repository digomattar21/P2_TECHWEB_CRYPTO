import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../firebase';
import TickerTape from '../TickerTape';
import SearchIcon from '@material-ui/icons/Search';
import CryptoTable from '../CryptoTable';
import { Button } from '@material-ui/core';

function Dashboard() {
  const [user,loading] = useAuthState(auth);
  const [query, setQuery] = useState("")

  

  return (
    <DashboardMainContainer>
      {/* <TickerTape /> */}
      <UpperSectionContainer>
        
        <h2>Browse Cryptocurrencies</h2>

      </UpperSectionContainer>

      <LowerSectionContainer>
        <SearchContainer>
          <form  >
          <TextField className='coinInput' label="Coin ticker" value={query} type="search" onChange={(e)=>{setQuery(e.target.value)}} />
          <SearchIcon />
          </form>

        </SearchContainer>

        <CryptoTable query={query} setQuery={setQuery}/>

      </LowerSectionContainer>

    </DashboardMainContainer>
  )
}

export default Dashboard;

const DashboardMainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const UpperSectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

`;

const LowerSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;


`;

const SearchContainer = styled.div`
  width: 50%;
  max-height: 60px;
  .coinInput{
    width: 100%;
  }
  >form{
    display: flex;
    align-items: center;
  }
`;
