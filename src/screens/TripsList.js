import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useModal from "../hooks/useModal"
import styled from "styled-components"
import TripService from "../services/TripService"
import { retrieveTrips } from "../actions/trips"
import { Template, Spacer, Button, TripCard, Modal } from "../components"


const TripsList = () => {
  const [currentTrip, setCurrentTrip] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const { show, toggleVisibility } = useModal()


  const trips = useSelector(state => state.trips)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveTrips())
  }, [trips])

  const refreshData = () => {
    setCurrentTrip(null)
    setCurrentIndex(-1)
  }

  const removeAllTrips = () => {
    TripService.removeAll()
    .then(res => {
      console.log("res", res)
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
          return (
            <TripCard trip={trip} key={index}/>
          )})
          }
        </TripsContainer>
        <Spacer medium />
        <Button onClick={toggleVisibility} outlined text="REMOVE ALL" />
        <Modal display={show} hide={toggleVisibility}>
          <p>Are you sure you want to remove ALL trips?</p>
          <Button text="YES" onClick={removeAllTrips} colour={({theme}) => theme.alert}/>
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