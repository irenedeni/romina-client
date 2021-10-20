import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"

import { calendarObject } from "../lib/tripFunctions"
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
          <h4>{currentTrip.name}</h4>
          <Link
            to={`/edit/trips/${currentTrip.id}`}>
              <div style={{width: 'max-content', border: '1px solid black', padding: '5px 10px', margin: '10px'}}>EDIT</div>
              </Link>
          {currentTrip.days?.map((day, index) => (
          <div key={index}>
            <div>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</div>  
            {console.log(day)}
            {day.slots?.map((slot, index) => {
              return (
                <div key={index} style={{border: "1px solid black", maxWidth: "max-content", padding: "5px 20px", margin: "10px 0px"}}>
                  <b>SLOT</b>
                  <p>TIMEFRAME: {slot.timeframe}</p>
                  <p>LENGTH: {slot.stayType}</p>
                  <p>CARER: {slot.carer?.name}</p>
                  <div>
                    {slot.tasks?.map((task, index) => {
                      return (
                        <div key={index}>
                          <p>Task #{index+1}</p>
                          <p>{task.type}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
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