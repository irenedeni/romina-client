import React from "react"
import styled from "styled-components"

function Template(props) {

  return (
    <TemplateContainer direction={props.direction}>
      {props.children}
    </TemplateContainer>
  )
}

const TemplateContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: ${props => props.direction === "vertical" ? "column" : "row"};
  justify-content: center;
  align-items: center;
  margin: 60px 140px;
  @media(max-width: 1000px){
    margin: 60px 50px;
  };
  @media(max-width: 600px){
    margin: 60px 30px;
  }
`

export default Template