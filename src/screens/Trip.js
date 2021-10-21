import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"

import { calendarObject } from "../lib/functionsAndObjects"
import { updateTrip, deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"
import { Toggle, Input, Template, Form, Button as StyledButton, Dropdown } from "../components"


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
    <Template>
      {currentTrip ? (
        <PageContainer>
          <h2>{currentTrip.name.toUpperCase()}</h2>
          <TripContainer>
          {currentTrip.days?.map((day, index) => (
          <DayContainer key={index}>
            <b>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</b>  
            <Link to={`/days/${day.id}/slots`}>
              <Button text="add slot" small/>
            </Link>
            {day.slots?.map((slot, index) => {
              return (
                <SlotContainer key={index}>
                  <b>SLOT</b>
                  <p>TIMEFRAME: {slot.timeframe}</p>
                  <p>LENGTH: {slot.stayType}</p>
                  <p>CARER: 
                  {!slot.carer?.name ?
                    <span> <Link to="/add_carer">
                        <Button small text="Add carer" />
                      </Link>
                    </span>
                    : <span><b> {slot.carer.name}</b></span>
                  }
                  </p>
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
                  <Link to={`/edit/slots/${slot.id}`}>
                    <Button small text="Edit slot" />
                  </Link>
                </SlotContainer>
              )
            })}
          </DayContainer>
          )
          )}
          </TripContainer>
            <Link
              to={`/edit/trips/${currentTrip.id}`}>
              <Button text="Edit" />
            </Link>
           <Button text="Delete trip" onClick={removeTrip}/>
          <p>{message}</p>
        </PageContainer>
      ) : (
        <PageContainer>
          <br />
          <p>The trip selected does not exist</p>
        </PageContainer>
      )}
    </Template>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const TripContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  background-color: #EAEAEA;
`

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  background-color: #D8D8D8;
`

const Button = styled(StyledButton)`
  margin: 20px 10px 20px 0px;
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 5px;
  background-color: #e9e6e6;
  width: 200px;
`

export default Trip