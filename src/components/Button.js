import React from "react"
import styled from "styled-components"

function Button(props) {

  return (
    <StyledButton color={props.color || "#ff8b28"} {...props}>{props.text}</StyledButton>
  )
}

const StyledButton = styled.button`
  padding: ${props => props.small ? "5px 15px" : "8px 20px"};
  font-family: "Quicksand", sans-serif;
  background-color: ${props => props.outlined ? "transparent" : props.color};
  border: ${props => `0.5px solid ${props.color}`};
  border-radius: 5px;
  color: ${props => props.outlined ? props.color : "#fff"};
  font-size: ${props => props.small ? "13px" : "15px"};
  width: ${props => props.maxWidth ? "100%": "max-content"};
  cursor: pointer;
`

export default Button