import React from "react"
import styled, { css } from "styled-components"

function Spacer(props) {
  return (
    <StyledSpacer {...props}  />
  )
}

const StyledSpacer = styled.div`
  display: flex;
  height: ${props => props.small ? "15px" : props.medium ? "35px" : props.large ? "50px" : "20px"};
`

export default Spacer