import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import styled from "styled-components"
import { calendarObject } from "../lib/functionsAndObjects"
import {
  retrieveTrips,
  findTripsByName,
  deleteAllTrips
} from "../actions/trips"
import { Input, Template, Form, Spacer, Button } from "../components"


const TripsList = () => {

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

  const setActiveTrip = (trip, index) => {
    setCurrentTrip(trip)
    setCurrentIndex(index)
  }

  const removeAllTrips = () => {
    dispatch(deleteAllTrips())
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const findByName = (e) => {
    e.preventDefault()
    refreshData()
    dispatch(findTripsByName(searchName))
    .then(res => {
      console.log("res",res)
    })
  }

  const findTripRange = (daysArray) => {
    for (let i = 0; i < daysArray?.length; i++){
      daysArray[i].date = new Date(daysArray[i].date)
    }
    const sortedArray = daysArray?.sort((a, b) => a.date - b.date)
    let tripRange = []
    tripRange.push(sortedArray && sortedArray[0])
    tripRange.push(sortedArray && sortedArray[sortedArray.length -1])
    return tripRange
  }

  return (
    <Template direction="vertical">
      <Form>
        <Input
          type="text"
          placeholder="search by trip name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <Button
          onClick={findByName} 
          text="Search"
          maxWidth
        />
      </Form>
    <Spacer />
      <ListContainer>
        <h2>Trips list</h2>
        <Link to="/add_trip">
          <AddButton text="ADD TRIP"/>
        </Link>
        <TripsContainer>
          {trips &&
          trips.map((trip, index) => {
            const tripRange = findTripRange(trip?.days)
          return (
            <TripContainer 
            key={index}
              className={index === currentIndex ? "active" : ""}
              style={{marginBottom: '20px'}}
            >
              <TripName onClick={() => setActiveTrip(trip, index)} active={currentTrip && (index === currentIndex)}>
              {trip.name.toUpperCase()}
              </TripName>
              <div>
                From: {`${moment(tripRange[0].date).calendar(null, calendarObject)}`}{", "}
              </div>
              <div>
                Until: {`${moment(tripRange[tripRange?.length - 1].date).calendar(null, calendarObject)}`} 
              </div>
              <TripButtonsDiv active={currentTrip && (index === currentIndex)}>
                <Link to={"/trips/" + trip.id}>
                  <Button small text="open" style={{margin: "10px 10px 0px 0px"}}/>
                </Link>
                <Link to={"/edit/trips/" + trip.id}>
                  <Button small text="edit" style={{marginTop: "10px"}}/>
                </Link>
              </TripButtonsDiv>
            </TripContainer>
          )})
          }
        </TripsContainer>
        <Spacer medium />
        <Button onClick={removeAllTrips} text="REMOVE ALL"/>
      </ListContainer>
    </Template>
  )
}

const TripName = styled.h4`
  font-weight: ${props => props.active && '700'};
  :hover {
    cursor: pointer;
    font-weight: 700;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const TripsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
`

const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 10px;
  background-color: #e9e6e6;
  width: 250px;
`

const TripButtonsDiv = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  width: 100%;
`

const AddButton = styled(Button)`
  margin: 15px;
`

export default TripsList