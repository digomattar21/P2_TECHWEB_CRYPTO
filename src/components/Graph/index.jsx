import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

function Graph() {
  const location = useLocation();
  const [ticker,setTicker] = useState(null);

  useEffect(()=>{
    setTicker(location.state.tv_ticker)
  },[])

  return (
    <MainContainer>
      <GraphContainer>
      {ticker && (
        <TradingViewWidget 
        symbol={`BITFINEX:${ticker}`}
        theme={Themes.DARK}
        locale="br"
        autosize
      />
      )}
    </GraphContainer>
    </MainContainer>
  )
}

export default Graph;

const MainContainer = styled.div`
  margin-top: 40px;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
`;

const GraphContainer= styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`;
