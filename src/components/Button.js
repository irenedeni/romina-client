import React from "react"
import styled, { css } from "styled-components"

function Button(props) {
  return (
    <StyledButton {...props}>{props.text}</StyledButton>
  )
}
const StyledButton = styled.button`
  padding: ${props => props.small ? "5px 15px" : "8px 20px"};
  font-family: "Quicksand", sans-serif;
  letter-spacing: 0.3px;
  background-color: ${props => props.outlined ? "transparent" : props.colour ? props.colour : ({ theme }) => theme.primary};
  border: 1px solid ${props => !props.colour ? ({ theme }) => theme.primary : props.colour};
  border-radius: 5px;
  ${props => (props.outlined && !props.colour) && css`
    color: ${({ theme }) => theme.primary};
  `};
  ${props => (props.outlined && props.colour) && css`
    color: ${props.colour};
  `};
  font-size: ${props => props.small ? "13px" : "15px"};
  width: ${props => props.maxWidth ? "100%": "max-content"};
  box-shadow: ${({ theme }) => theme.shadow2};
  cursor: pointer;
  :hover {
    box-shadow: ${({ theme }) => theme.shadow1};
    font-weight: 500;
    opacity: 0.9;
    border-width: 1px solid ${props => !props.colour ? ({ theme }) => theme.primary : props.colour};
    background-color: ${props => props.outlined ? "transparent" : props.colour ? props.colour : ({ theme }) => theme.primary};
  }
`

export default Button