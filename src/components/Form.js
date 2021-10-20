import React from "react"
import styled from "styled-components"
import Button from "./Button"
import Spacer from "../components/Spacer"

function Form(props) {

  return (
    <Container onSubmit={props.onSubmit}>
      {props.children}
      <Spacer small/>
      <Button  
        type="submit" 
        onClick={props.onClick} 
        text="Submit"
      />
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Form