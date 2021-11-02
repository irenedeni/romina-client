import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { retrieveTrips } from "../actions/trips"
import { Link } from 'react-router-dom'
import { Search } from "./index"


function Navigation(props) {

  return (
    <NavContainer>
      <ElementsContainer>
        <NavElements>
          {props.navElements?.map((element, index) => 
            <NavElement key={index}>
              <Link to={element.href}>
                {element.name}
              </Link>
            </NavElement>
          )}
        </NavElements>
        <Search />
      </ElementsContainer>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: flex;
  margin-bottom: 50px;
  appearance: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadow1};
`

const ElementsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const NavElements = styled.div`
  display: flex;
  align-items: center;
`

const NavElement = styled.div`
  margin: 20px;
`


export default Navigation

