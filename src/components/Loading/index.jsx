import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
  return (
    <ProgressContainer>
      <CircularProgress className="progress" />
    </ProgressContainer>
  );
}

export default Loading;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;

  .progress {
    color: ##545454;
  }
`;
