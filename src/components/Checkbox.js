import React, { useState } from "react"
import styled, { css } from "styled-components"

function Checkbox(props) {
  console.log("props.value",props.value)
  return (
    <Container>
      <Label>{props.name[0].toUpperCase() + props.name.substring(1)}</Label>
      <StyledCheckbox 
        {...props}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 10px auto;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0px 8px 3px 0px;
  font-weight: 400;
`

const StyledCheckbox = styled.input.attrs({ 
  type: 'checkbox'
})`
  position: relative;
  background: #fff;
  font-family: "Quicksand", sans-serif;
  width: 60px;
  height: 30px;
  -webkit-appearance: initial;
  border-radius: 3px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #ddd;
  :after {
  position: absolute;
  top: 5%;
  color: #fff;
  display: block;
  line-height: 32px;
  width: 45%;
  height: 90%;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.3s ease-in 0s;
  background-color: #ff6428;
  border-radius: 3px;
  left: 2%;
  content: "";
  ${props => props.value && css`
    left: 53%;
    background-color: #05b55c;
    content: "";
    color: #fff;
  `}    
}
`

export default Checkbox