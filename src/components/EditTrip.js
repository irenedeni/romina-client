import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateTrip, deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"

const EditTrip = (props) => {
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
      {currentTrip ? (
        <div>
          <h4>UPDATE Trip</h4>
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentTrip.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTrip.confirmed ? "Confirmed" : "Pending"}
            </div>
          </form>
          {currentTrip.confirmed ? (
            <button onClick={() => updateStatus(false)}>
              Un-confirm
            </button>
          ) : (
            <button onClick={() => updateStatus(true)}>
              Confirm
            </button>
          )}
          <button onClick={removeTrip}>
            Delete
          </button>
          <button
            type="submit"
            onClick={updateContent}
          >
            Update
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

export default EditTrip