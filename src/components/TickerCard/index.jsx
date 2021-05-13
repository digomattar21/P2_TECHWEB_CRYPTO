import React from "react";
import {useHistory} from 'react-router-dom'
import styled from "styled-components";
import ClearIcon from '@material-ui/icons/Clear';
import InsertChartIcon from '@material-ui/icons/InsertChart';

function TickerCard({ ticker , handleRemoveFromWatchlistClick}) {
  const history = useHistory();

  const handleCardClick = ()=>{
    let tv_ticker = `${ticker.symbol.toUpperCase()}USD`
    history.push({
      pathname:'/graph',
      state:{tv_ticker:tv_ticker}
    })
  }

  
  
  return (
    <TickerCardCont>
        <div className='iconsCont'>
          <InsertChartIcon id="chartIcon" onClick={()=>handleCardClick()}/>
          <ClearIcon id='clearIcon' onClick={()=>handleRemoveFromWatchlistClick(ticker)}/>
        </div>
      <TickerTitle>
        <h4>{ticker.symbol} </h4>
        <div>
          <span style={{ fontWeight: "bold" }}>
          $
          {ticker.price > 10
            ? ticker.price.toFixed(2)
            : ticker.price.toFixed(3)}
        </span>
        <span className={ticker.percent_change_24h > 0 ? "green" : "red"}>
            ({ticker.percent_change_24h}%)
        </span>
        </div>
        
      </TickerTitle>
      <TickerInfo>
            <TickerLeft>
        <h6>Volume: </h6>
        <h6>Volume 24h: </h6>
        <h6>Volatility: </h6>
        <h6>Mkt Cap: </h6>
        <h6>7d change:</h6>
        <h6>30d change:</h6>
        <h6>SocialScore rank: </h6>
        <h6>Average sentiment: </h6>
      </TickerLeft> 
      <TickerRight>
        <h6>{(ticker.volume/1000000000).toFixed(2)} B</h6>
        <h6>{(ticker.volume_24h/1000000000).toFixed(2)} B</h6>
        <h6>{ticker.volatility.toFixed(3)}</h6>
        <h6>{(ticker.market_cap/1000000000).toFixed(2)}B</h6>
        <h6 className={ticker.percent_change_7d>0?"green": "red"}>{ticker.percent_change_7d}%</h6>
        <h6 className={ticker.percent_change_30d>0?"green": "red"}>{ticker.percent_change_30d}%</h6>
        <h6>{ticker.social_score_24h_rank}</h6>
        <h6>{ticker.average_sentiment}</h6>

      </TickerRight>
      </TickerInfo>

    </TickerCardCont>
  );
}

export default TickerCard;

const TickerTitle = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  > h4 {
    font-weight: 700;
  }
  .green {
    color: green;
    margin-left: 2px;
  }
  .red {
    color: red;
    margin-left: 2px;
  }
`;

const TickerCardCont = styled.div`
  padding: 12px 30px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 6px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: flex-start;
  margin-bottom: 30px;
  .iconsCont{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  #chartIcon{
    color: blue;
    :hover{
      opacity: 0.7;
      cursor: pointer;
    }
  }

  #clearIcon{
    color: red;
    :hover{
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

const TickerInfo = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TickerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  >h6{
    margin-top: 3px;
  }
`;
const TickerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  >h6{
    color: blue;
    margin-top: 3px;
  }

  .green{
    color: green;
  }

  .red{
    color: red;
  }
`;
