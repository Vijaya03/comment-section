import React, { Component } from 'react';
import styled from 'styled-components';
const Time =  styled.div`
color:var(--GrayishBlue);`;
const TimeStamp = (props) =>{
    return <Time>{props.time}</Time>
}
export default TimeStamp;