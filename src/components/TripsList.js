import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import styled from "styled-components"
import { calendarObject } from "../lib/tripFunctions"
import {
  retrieveTrips,
  findTripsByName,
  deleteAllTrips
} from "../actions/trips"


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
    console.log(currentTrip, currentIndex)
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

  const findByName = () => {
    refreshData()
    dispatch(findTripsByName(searchName))
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
    <>
      <div>
        <form>
          <div>
            <input
            type="text"
            placeholder="search by trip name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          </div>
          <div>
            <button
              type="button"
              onClick={findByName}>
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        <h4>Trips list</h4>
        <ul>
          {trips &&
          trips.map((trip, index) => {
            const tripRange = findTripRange(trip?.days)
          return (
            
            <li 
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
                <Link to={"/trips/" + trip.id} >
                  <div style={{width: 'max-content', border: '1px solid black', padding: '5px 10px', margin: '10px'}}>
                    Open trip
                  </div>
                </Link>
                <Link to={"/edit/" + trip.id}>
                  <div style={{width: 'max-content', border: '1px solid black', padding: '5px 10px', margin: '10px'}}>
                    edit trip
                  </div>
                </Link>
              </TripButtonsDiv>
            </li>
          )})
          }
        </ul>
        <button onClick={removeAllTrips}>
          Remove all
        </button>
      </div>
    </>
  )
}

const TripName = styled.div`
  font-weight: ${props => props.active && '700'};
`

const TripButtonsDiv = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
`

export default TripsList