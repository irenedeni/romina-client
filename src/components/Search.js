import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Input, Form, Button } from "./index"
import { findTripsByName } from "../actions/trips"
import { findCarersByName } from "../actions/carers"
import { useDispatch } from "react-redux"
      
function Search(props) { 
  const [searchName, setSearchName] = useState("")

  const dispatch = useDispatch()

  const location = useLocation()

  const { pathname } = location

  const findByName = (e) => {
    e.preventDefault()
    switch (pathname) {
      case "/trips":
        return dispatch(findTripsByName(searchName))
        .then(res => {
          console.log("found trip(s):",res)
        })
      case "/carers":
        return dispatch(findCarersByName(searchName))
        .then(res => {
          console.log("found carer(s):",res)
        })
      default:
        return null
      }
    } 

  const onChangeSearchName = e => {
    e.preventDefault()
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const searchLocation = (pathname) => {
    if(pathname === "/carers" || pathname === "/trips"){
      return true
    } else return false
  }

  console.log("searchLocation", searchLocation)

  return (
    <FormContainer searchLocation={searchLocation(pathname)}>
      <Form horizontal>
        <Input
          highlight
          type="text"
          placeholder="search by trip name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <Button
          onClick={findByName} 
          text="Search"
          color={({theme}) => theme.secondary}
          style={{marginLeft: "20px"}}
        />
      </Form>
    </FormContainer>
  )}

  const FormContainer = styled.div`
    display: ${props => props.searchLocation ? "flex" : "none"};
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-right: 20px;
    margin-top: -20px;
  `

  export default Search
