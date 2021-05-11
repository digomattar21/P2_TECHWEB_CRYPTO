import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../../firebase';
import Api from '../../util/api.util'
import Loading from '../Loading'
import TickerCard from '../TickerCard';

function Watchlist() {
  const [user] = useAuthState(auth);
  const [tickerList, setTickerList] = useState(null)

  useEffect(()=>{
    getWatchlistInfo()
  },[]);

  const getWatchlistInfo = async ()=>{
    let payload = {email: user.email}

    try {
      let req = await Api.GetWatchlistInfo(payload);
      console.log(req)
      getTickerMainInfo(req.data.tickers)

    } catch (error) {
      console.log(error)
    }

  }

  const getTickerMainInfo= async(tickers)=>{
    let temp = []
    tickers.map((ticker)=> temp.push(ticker.symbol))
    let str = temp.join(',')
    console.log(str)
    let url = `${process.env.REACT_APP_LUNARCRUSH_MARKET_ENDPOINT}data=assets&key=${process.env.REACT_APP_LUNARCRUSH_KEY}&symbol=${str}`
    try {
      let req = await axios.get(url);
      console.log(req)
      setTickerList(req.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <WatchlistContainer>
      <h1>Watchlist</h1>

      {!tickerList && (
        <Loading />
      )}

      <TickersContainer>
      {tickerList && tickerList.length>0 && 
      tickerList.map((ticker)=>{
        console.log(ticker)
        return (
          <TickerCard ticker={ticker}/>
        )
      })
      }
      </TickersContainer>
      

    </WatchlistContainer>
  )
}

export default Watchlist;

const WatchlistContainer = styled.div`
  margin-top:10px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const TickersContainer = styled.div `
  display: flex;
  margin-top: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;
