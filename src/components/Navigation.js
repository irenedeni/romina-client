import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'


function Navigation(props) {
  return (
    <NavContainer>
      <ElementsContainer>
      {props.navElements?.map((element, index) => 
        <NavElement key={index}>
          <Link to={element.href}>
            {element.name}
          </Link>
        </NavElement>
      )}
      </ElementsContainer>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: flex;
  background-color: #e9e6e6;
  margin-bottom: 50px;
`

const ElementsContainer = styled.div`
  display: flex;
`

const NavElement = styled.div`
  margin: 20px;
`

export default Navigation

