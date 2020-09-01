/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import SelectCustomer from './components/selectCustomer';
import { seats } from './constants';

const container = css`
  text-align: center;
  padding: 1% 5%;
  margin: 0 auto;
`;
const fs25 = css`font-size: 25px;`;
const textLeft  =css`text-align:left;`;
const theatre = css`
  width: 60%;
  margin: 10px auto;
  background: #f7f5f5;
  padding: 1.5%;
  border-radius: 10px;
  color:#757474;
  @media (max-width: 767px) { width: 80%;}
`;
const seatCSS = css`
  height: 30px;
  width: 25px;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  color: #a4a4a4;
  border: 1px solid #a4a4a4;
  :focus{ outline: none; }
  :disabled{
    cursor: default;
    color: white;
    background: #CCC;
    border: 1px solid #CCC;
  }
`;
const active = css`background: #72f582; border: 1px solid #72f582;`;
const flex=css`
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10%;
`;

function App() {
  const [customers, setCustomers] = useState(0);
  const [currentSeats, setCurrentSeats] = useState({...seats});
  const [selectedSeats, setSelectedSeats] = useState([]);

  const alreadySelected = (category, row, i) => {
    let resp = false;
    selectedSeats.forEach((seat)=>{
      if (seat[0]===category && seat[1]===row && seat[2]===i ) { resp = true }
    });
    return resp;
  };

  const setSingleSeat = (category, row, k) => {
    const currSeats = {...currentSeats};
    const selSeats = selectedSeats;
    currSeats[selectedSeats[0][0]][selectedSeats[0][1]][selectedSeats[0][2]] = 0;
    currSeats[category][row][k] = 2;
    selSeats[0] = [category, row, k];
    setCurrentSeats(currSeats);
    setSelectedSeats(selSeats);
  };

  const setSeats = (category, row, k) => {
    if(customers===0 || alreadySelected(category, row, k)) { return; }
    if(selectedSeats.length===customers){
      setSingleSeat(category, row, k);
      return;
    }
    const currSeats = {...currentSeats};
    const selSeats = selectedSeats;
    for(let i=k; i<currSeats[category][row].length; i++){
      if(currSeats[category][row][i] === 1){ 
        debugger
        break;
      }
      if((i<customers+k) && (currSeats[category][row][i] !== 2)) {
        currSeats[category][row][i] = 2;
        selSeats.push([category, row, i]);
      }
    }
    setSelectedSeats(selSeats);
    setCurrentSeats(currSeats);
  };
  
  return (
    <div css={container}>
      <header><h1 css={fs25}>Booking App</h1></header>
      <SelectCustomer customers={customers} setCustomers={setCustomers} />
      <div css={theatre}>
        {Object.keys(currentSeats).map((category)=>(
          <div key={category}>
            <div css={textLeft}>{category}</div>
            {Object.keys(currentSeats[category]).map((row)=>(
              <div key={row} css={flex}>
                <div>{row}</div>
                <div>{currentSeats[category][row].map((seat, i)=>(
                    <button onClick={()=>{setSeats(category, row, i)}} disabled={seat===1} css={[seatCSS, seat===2 ? active: '']}>{i+1}</button>       
                  ))}</div>
              </div>
            ))}
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
