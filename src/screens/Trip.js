import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"

import { calendarObject, orderSlotsByTimeframe } from "../lib/functionsAndObjects"
import { deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"
import { Template, Button as StyledButton, Dropdown, Form, SlotCard } from "../components"


const Trip = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)

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
      {currentTrip?.id ? (
        <PageContainer>
          <h1>{currentTrip.name.toUpperCase()}</h1>
          <TripContainer>
          {currentTrip.days?.map((day, index) => {
          return (
          <DayContainer key={index}>
            <h3>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</h3>  
            <Link to={`/days/${day.id}/slots`}>
              <AddButton text="+ SLOT"/>
            </Link>
            {day.slots?.length > 0 && orderSlotsByTimeframe(day.slots).map((slot, index) => {
              return (
                <SlotCard slot={slot} key={index}/>
              )
            })}
          </DayContainer>
          )}
          )}
          </TripContainer>
            <Link
              to={`/edit/trips/${currentTrip.id}`}>
              <Button text="Edit trip" color={({theme}) => `${theme.secondary}`}/>
            </Link>
              <Button text="Delete trip" onClick={removeTrip} outlined color={({theme}) => `${theme.secondary}`}/>
        </PageContainer>
      ) : (
        <NotFoundContainer>
          <p>The trip selected does not exist</p>
        </NotFoundContainer>
      )}
    </Template>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const TripContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
  margin: 20px 0px;
  justify-content: center;
`

const AddButton = styled(StyledButton)`
  margin: 35px 15px 15px 15px;
  padding: 8px 14px;
`



const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.surface1};
  width: 250px;
  max-width: 250px;
  box-shadow: ${({ theme }) => theme.shadow1};
`

const Button = styled(StyledButton)`
  margin-bottom: ${props => props.small ? "5px" : "20px"};
`


const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
`

export default Trip