import React from "react"
import styled from "styled-components"

function Input(props) {

const label = props.name?.split(/(?=[A-Z])/).join(" ")

  return (
    <Container>
      <Label>{label[0].toUpperCase() + label.substring(1)}</Label>
      <StyledInput {...props}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 10px auto;
`

const StyledInput = styled.input`
  display: flex;
  font-family: "Quicksand", sans-serif;
  font-weight: 300;
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  border: none; 
  background-color: #e9e6e6;
  padding: ${props => props.type == "text" ? "10px 15px" : "7px 15px"};
  border-radius: 5px;
`

const Label = styled.label`
  display: flex;
  margin-bottom: 3px;
  font-weight: 400;
`


export default Input