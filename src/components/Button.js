import React from "react"
import styled from "styled-components"

function Button(props) {

  return (
    <StyledButton {...props}>{props.text}</StyledButton>
  )
}

const StyledButton = styled.button`
  padding: ${props => props.small ? "5px 15px" : "10px 20px"};
  font-family: "Quicksand", sans-serif;
  background-color: ${props => props.outlined ? "transparent" : props.color ? props.color : "#ff8b28"};
  border: ${props => (props.outlined || props.color) ? `0.5px solid ${props.color || "#ff8b28"}` : "none"};
  border-radius: 5px;
  color: ${props => props.outlined ? (props.color || "#ff8b28") : props.color ? "#fff" : "#ddd"};
  font-size: ${props => props.small ? "13px" : "15px"};
  width: ${props => props.maxWidth ? "100%": "max-content"};
  cursor: pointer;
`

export default Button