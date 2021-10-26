import React from "react"
import styled from "styled-components"


function Template(props) {
console.log("props.theme",   ({ theme }) => theme.bg)
  return (
    <TemplateContainer direction={props.direction}>
      {props.children}
    </TemplateContainer>
  )
}

const TemplateContainer = styled.div`
  display: flex;
  position: relative;
  background-color: ${({ theme }) => theme.bg};
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