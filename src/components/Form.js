import React from "react"
import styled from "styled-components"
import Button from "./Button"
import Spacer from "../components/Spacer"

function Form(props) {

  return (
    <Container onSubmit={props.onSubmit}>
      {props.children}
      <Spacer small/>
      {(props.onSubmit || props.onClick) &&
        <Button  
          type="submit" 
          // maxWidth
          onClick={props.onClick} 
          text={props.btnText || "Submit"}
        />
      }
      
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Form