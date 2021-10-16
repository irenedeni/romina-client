import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { updateTrip, deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"

const Trip = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const getTrip = id => {
    TripDataService.get(id)
    .then(res => {
      setCurrentTrip(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTrip(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentTrip({ ...currentTrip, [name]: value })
  }

  const updateStatus = status => {
    const data = {
      id: currentTrip.id,
      name: currentTrip.name,
      confirmed: status
    }

    dispatch(updateTrip(currentTrip.id, data))
    .then(res => {
      console.log(res)

      setCurrentTrip({ ...currentTrip, confirmed: status })
      setMessage("status updated successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const updateContent = () => {
    dispatch(updateTrip(currentTrip.id, currentTrip))
    .then(res => {
      console.log(res)
      setMessage("trip updated successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeTrip = () => {
    dispatch(deleteTrip(currentTrip.id))
    .then(()=> {
      props.history.push("/trips")
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <div>
      
      <div>

      </div>
      {currentTrip ? (
        <div>
          <h4>JUST THE TRIP (NO UPDATE)</h4>
          {currentTrip.name}
          <Link
            to={"/trips/edit/" + currentTrip.id}>
              <div style={{border: "1px solid black"}}>EDIT</div>
              </Link>
          {currentTrip.days?.map((day, index) => (
          <div key={index}>
            <div>NAME: {day.name}</div>  
            <div>DATE: {day.date}</div>  
          </div>
          )
          )}
          <button onClick={removeTrip}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Select a trip</p>
        </div>
      )}
    </div>
  )
}

export default Trip