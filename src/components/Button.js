import React from "react"
import styled, { css } from "styled-components"

function Button(props) {

  return (
    <StyledButton color={props.color} {...props}>{props.text}</StyledButton>
  )
}
const StyledButton = styled.button`
  padding: ${props => props.small ? "5px 15px" : "8px 20px"};
  font-family: "Quicksand", sans-serif;
  letter-spacing: 0.3px;
  background-color: ${props => props.outlined ? "transparent" : props.color ? props.color : ({ theme }) => theme.primary};
  border: 1px solid ${props => !props.color ? ({ theme }) => theme.primary : props.color};
  border-radius: 5px;
  ${props => (props.outlined && !props.color) && css`
    color: ${({ theme }) => theme.primary};
  `};
  ${props => (props.outlined && props.color) && css`
    color: ${props.color};
  `};
  font-size: ${props => props.small ? "13px" : "15px"};
  width: ${props => props.maxWidth ? "100%": "max-content"};
  box-shadow: ${({ theme }) => theme.shadow2};
  cursor: pointer;
  :hover {
    box-shadow: ${({ theme }) => theme.shadow1};
    font-weight: 500;
    border-width: 1px solid ${props => !props.color ? ({ theme }) => theme.primary : props.color};
    background-color: ${props => props.outlined ? "transparent" : props.color ? props.color : ({ theme }) => theme.primary};
  }
`

export default Button