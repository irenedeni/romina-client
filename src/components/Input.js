import React from "react"
import styled from "styled-components"

function Input(props) {

const label = props.name?.split(/(?=[A-Z])/).join(" ")

  return (
    <Container {...props}>
      {label &&
        <Label>{label[0].toUpperCase() + label.substring(1)}</Label>
      }
      <StyledInput {...props} small={props.small}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => !props.autoWidth && "300px"};
  margin: 10px auto;
`

const StyledInput = styled.input`
  display: flex;
  font-family: "Quicksand", sans-serif;
  font-weight: 300;
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  padding: ${props => props.small ? "6px 15px" : props.type === "text" ? "10px 15px" :  "7px 15px"};
  border-radius: 5px;
  border: 1px solid ${(props) => props.highlight ? (({theme}) => theme.secondary ) : (({theme}) => theme.textOverlay)};
  color: ${({ theme }) => theme.textOverlay};
  background-color: ${({ theme }) => theme.surface1};
  :focus, :visited, :active, :target, :focus-visible{
    outline: none;
    font-weight: 500;
    border-width: 2px;
  };
`

const Label = styled.label`
  display: flex;
  margin-bottom: 5px;
  font-weight: 300;
  color: ${({ theme }) => theme.textOverlay};
`


export default Input