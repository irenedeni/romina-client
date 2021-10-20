import React from "react"
import styled from "styled-components"

function Button(props) {

  return (
    <StyledButton {...props}>{props.text}</StyledButton>
  )
}

const StyledButton = styled.button`
  padding: 10px 20px;
  font-family: "Quicksand", sans-serif;
  background-color: ${props => props.color || "#ff8b28"};
  border: none;
  border-radius: 5px;
`

export default Button