import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
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
          // console.log("trips", trips)
          trips.map((trip, index) => (
            <li 
              className={index === currentIndex ? "active" : ""}
              onClick={() => setActiveTrip(trip, index)}
              key={index}
            >
              {trip.name}
            </li>
          ))
          }
        </ul>
        <button onClick={removeAllTrips}>
          Remove all
        </button>
      </div>
      <div>
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
                <strong>Start Date:</strong>
              </label>{" "}
              {currentTrip.startDate}
            </div>
            <div>
              <label>
                <strong>End Date:</strong>
              </label>{" "}
              {currentTrip.endDate}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTrip.published ? "Published" : "Pending"}
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
      </div>
    </>
  )
}

export default TripsList