import React from "react";
import styled from "styled-components";

function TickerCard({ ticker }) {
  console.log(ticker);
  return (
    <TickerCardCont>
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
      </TickerLeft>
      <TickerRight>
        <h6>{(ticker.volume/1000000000).toFixed(2)} B</h6>
        <h6>{(ticker.volume_24h/1000000000).toFixed(2)} B</h6>
        <h6>{ticker.volatility.toFixed(3)}</h6>
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
`;
const TickerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
