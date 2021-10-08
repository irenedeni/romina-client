import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTrip } from "../actions/trips"

const AddTrip = () => {
  const initialTripState = {
    id: null,
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    published: false
  }

  const [trip, setTrip] = useState(initialTripState)

  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { name, value } = event.target
    setTrip({ ...trip, [name]: value })
  }

  const saveTrip = () => {
    const { name, startDate, endDate } = trip

    dispatch(createTrip(name, startDate, endDate))
    .then(data => {
      setTrip({
        id: data.id,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        published: data.published ? data.published : false
      })
      setSubmitted(true)

      console.log('data', data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const newTrip = () => {
    setTrip(initialTripState)
    setSubmitted(false)
  }

  return (
    <div>
      <form>
        {submitted ? (
          <div>
            <h4>New trip submitted successfully</h4>
            <button onClick={newTrip}>Add</button>
          </div>
        ) : (
          <div>
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                required
                value={trip.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                id="startDate"
                required
                value={trip.startDate}
                onChange={handleInputChange}
                name="startDate"
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                id="endDate"
                required
                value={trip.endDate}
                onChange={handleInputChange}
                name="endDate"
              />
            </div>
            <button onClick={saveTrip}>
              Submit
            </button>
          </div>
        )
        }
      </form>
    </div>
  )
}

export default AddTrip