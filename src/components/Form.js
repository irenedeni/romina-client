import React from "react"
import styled from "styled-components"
import Button from "./Button"
import Spacer from "../components/Spacer"

function Form(props) {

  return (
    <Container {...props}>
      {props.children}
      <Spacer small/>
      {(props.onSubmit || props.onClick) &&
        <Button  
          type="submit" 
          onClick={props.onClick} 
          text={props.btnText || "Submit"}
        />
      }
      
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: ${props => !props.horizontal ? "column" : "row"};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export default Form