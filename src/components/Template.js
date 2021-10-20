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
  flex-direction: ${props => props.direction === "vertical" ? "column" : "row"};
  justify-content: center;
  margin: 60px auto;
`

export default Template