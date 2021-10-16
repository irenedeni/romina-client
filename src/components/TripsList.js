import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
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

  const calendarObject = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Next] dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'dddd LL'
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
            <Link
            to={"/trips/" + trip.id} key={index}>
            <li 
              className={index === currentIndex ? "active" : ""}
              onClick={() => setActiveTrip(trip, index)}
              
            >
              NAME: {trip.name}, ID: {trip.id}, DAYS - From: {`${moment(tripRange[0].date).calendar(null, calendarObject)}`}{", "}
              Until: {`${moment(tripRange[tripRange?.length - 1].date).calendar(null, calendarObject)}`} 
            </li>
            </Link>
          )})
          }
        </ul>
        <button onClick={removeAllTrips}>
          Remove all
        </button>
      </div>
      {/* <div>
        {currentTrip ? (
          <div>
            <h4>Trip</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentTrip.name}
            </div>
            <div>
              <label>
                <strong>Dates:</strong>
              </label>{" "}
              From: {`${moment(tripRange[0].date).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'LLLL'
              })}`}{", "}
              Until: {`${moment(tripRange[tripRange?.length - 1].date).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'LLLL'
              })}`} 
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTrip.confirmed ? "Confirmed" : "Pending"}
            </div>
            <Link
            to={"/trips/" + currentTrip.id}>
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Select a trip</p>
          </div>
        )
      }
      </div> */}
    </>
  )
}

export default TripsList