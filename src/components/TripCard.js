import React, { useState } from "react"
import styled from "styled-components"
import moment from "moment"
import { useDispatch } from "react-redux"

import { Button } from "../components"
import { Link } from "react-router-dom"
import { calendarObject } from "../lib/functionsAndObjects"
import { deleteTrip } from "../actions/trips"

function TripCard(props) {
  const [currentTrip, setCurrentTrip] = useState(null)
  const dispatch = useDispatch()

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

  const refreshData = () => {
    setCurrentTrip(null)
  }

  const removeTrip = (id) => {
    dispatch(deleteTrip(id))
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const { trip } = props
  const tripRange = findTripRange(trip.days)

  return (
    <TripContainer 
      style={{marginBottom: '20px'}}
    >
      <Link to={"/trips/" + trip.id} style={{textDecoration: "none"}}>
        <img />
        <TripName>
          {trip.name.toUpperCase()}
        </TripName>
      </Link>
      <TextDiv>
        <div>{`${moment(tripRange[0].date).calendar(null, calendarObject)}`}{" "}</div>
      -
        <div>{`${moment(tripRange[tripRange?.length - 1].date).calendar(null, calendarObject)}`}</div>
      </TextDiv>
      <TripButtonsDiv>
        <Link to={"/edit/trips/" + trip.id}>
          <Button small text="edit" style={{margin: "10px 10px 0px 0px"}}/>
        </Link>
        <Button small text="delete" style={{margin: "10px 0px 0px 0px"}} onClick={() => removeTrip(trip.id)}/>
      </TripButtonsDiv>
    </TripContainer>
  )
}



const TripName = styled.h3`
  font-weight: 700;
  text-decoration: none;
  margin: 10px 0px;
  :hover {
    cursor: pointer;
  }
`

const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: center;
  margin: 10px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.surface1};
  border-radius: ${({ theme }) => theme.mediumRadius};
  width: 250px;
  :hover {
    box-shadow: ${({ theme }) => theme.shadow1};
    cursor: pointer;
  }
`
const TripButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`
const TextDiv = styled.div`
  font-weight: 500;
  margin: 10px 0px;
  display: flex;
  line-height: 1.2rem;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.textOverlay};
`


export default TripCard