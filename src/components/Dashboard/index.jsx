import { TextField } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../firebase';
import TickerTape from '../TickerTape';
import SearchIcon from '@material-ui/icons/Search';
import CryptoTable from '../CryptoTable';

function Dashboard() {
  const [user,loading] = useAuthState(auth);

  return (
    <DashboardMainContainer>
      {/* <TickerTape /> */}
      <UpperSectionContainer>
        
        <h2>Browse Cryptocurrencies</h2>

      </UpperSectionContainer>

      <LowerSectionContainer>
        <SearchContainer>
          <form>
          <TextField className='coinInput' label="Coin ticker" type="search" />
          <SearchIcon />
          </form>

        </SearchContainer>

        <CryptoTable />

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
