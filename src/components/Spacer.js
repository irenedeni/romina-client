import React from "react"
import styled from "styled-components"

function Spacer(props) {

  return (
    <StyledSpacer {...props} />
  )
}

const StyledSpacer = styled.div`
 height: ${props => props.small ? "15px" : props.medium ? "35px" : props.large ? "50px" : "15px"};
`

export default Spacer