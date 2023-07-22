import React from 'react';
import styled from "styled-components";

const Headings = () => {
    return (
        <HeadingRow>
            <ListHeading>Ticker</ListHeading>
            <ListHeading>Exchange</ListHeading>
            <ListHeading>Price</ListHeading>
            <ListHeading>Change</ListHeading>
            <ListHeading>Change %</ListHeading>
            <ListHeading>Dividend</ListHeading>
            <ListHeading>Yield</ListHeading>
            <ListHeading>Trade Time</ListHeading>
        </HeadingRow>
    );
};

const HeadingRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  @media (max-width: 820px) {
    display: grid;
    grid-template-rows: 1fr 1fr ;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ListHeading = styled.div`
  padding: 5px;
  width: 90px;
  text-align: center;
  font-size: 12px;
`;

export default Headings;