/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, useState, useEffect } from 'react';

const btn = css`
  color: #0378FF;
  border-radius: 50%;
  border: 1px solid #0378FF;
  background: white;
  width: 25px;
  height: 25px;
  font-size: larger;
  margin: 0 7px;
  cursor: pointer;
  :focus{ outline: none; }
  :disabled{
    cursor: default;
    color: #CCC;
    border: 1px solid #CCC;
  }
`;

export default ({customers, setCustomers}) => (
  <Fragment>
    <div>
      <label>Select number of people</label><br/>
      <div>
        <button onClick={()=>{setCustomers(customers-1)}} disabled={customers===0} css={btn}>-</button>
        {customers}
        <button onClick={()=>{setCustomers(customers+1)}} disabled={customers===10} css={btn}>+</button>
      </div>
    </div>
    <hr/>
  </Fragment>
)