import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { retrieveTrips } from "../actions/trips"
import { Link } from 'react-router-dom'
import { Search } from "./index"


function Navigation(props) {
  const [currentTrip, setCurrentTrip] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [searchName, setSearchName] = useState("")

  const trips = useSelector(state => state.trips)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveTrips())
  }, [dispatch])

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const refreshData = () => {
    setCurrentTrip(null)
    setCurrentIndex(-1)
  }

  // const findByName = (e) => {
  //   e.preventDefault()
  //   refreshData()
  //   dispatch(findTripsByName(searchName))
  //   .then(res => {
  //     console.log("res",res)
  //   })
  // }

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

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-right: 20px;
  margin-top: -20px;
`

export default Navigation

