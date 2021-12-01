import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useModal from "../hooks/useModal"
import styled from "styled-components"
import {
  retrieveTrips,
  deleteAllTrips,
  deleteTrip
} from "../actions/trips"
import { Template, Spacer, Button, TripCard, Modal } from "../components"


const TripsList = () => {

  const [currentTrip, setCurrentTrip] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const { show, toggleVisibility } = useModal()


  const trips = useSelector(state => state.trips)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveTrips())
  }, [dispatch])

  const refreshData = () => {
    setCurrentTrip(null)
    setCurrentIndex(-1)
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

  return (
    <Template direction="vertical">
      <ListContainer>
        <TitleContainer>
          <H1>Trips list</H1>
          <Link to="/add_trip" >
            <AddButton text="+"/>
          </Link>
        </TitleContainer>
        <TripsContainer>
          {trips &&
          trips.map((trip, index) => {
            const tripRange = findTripRange(trip?.days)
          return (
            <TripCard trip={trip} key={index}/>
          )})
          }
        </TripsContainer>
        <Spacer medium />
        <Button onClick={toggleVisibility} outlined text="REMOVE ALL" />
        <Modal display={show} hide={toggleVisibility}>
          <p>Are you sure you want to remove ALL trips?</p>
          <Button text="YES" onClick={removeAllTrips} color={({theme}) => `${theme.alert}`}/>
        </Modal>
      </ListContainer>
    </Template>
  )
}

const TripName = styled.h3`
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 15px;
  :hover {
    cursor: pointer;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const TripsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
`

const AddButton = styled(Button)`
  margin: 15px 15px 15px 30px;
  padding: 8px 14px;
  width: min-content;
  border-radius: ${({ theme }) => theme.largeRadius};
`

const H1 = styled.h1``

const TitleContainer = styled.div`
  display: flex;
  width: 300px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`

export default TripsList