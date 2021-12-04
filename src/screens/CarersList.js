import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import useModal from "../hooks/useModal"
import {
  retrieveCarers,
  findCarersByName,
  deleteAllCarers,
  deleteCarer
} from "../actions/carers"
import { Input, Template, Form, Spacer, Button, Modal } from "../components"


const CarersList = (props) => {

  const [currentCarer, setCurrentCarer] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [searchName, setSearchName] = useState("")

  const { show, toggleVisibility } = useModal()

  const carers = useSelector(state => state.carers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveCarers())
  }, [dispatch])

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const refreshData = () => {
    setCurrentCarer(null)
    setCurrentIndex(-1)
  }

  const setActiveCarer = (carer, index) => {
    setCurrentCarer(carer)
    setCurrentIndex(index)
  }

  const removeAllCarers = () => {
    dispatch(deleteAllCarers())
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const findByName = (e) => {
    e.preventDefault()
    refreshData()
    dispatch(findCarersByName(searchName))
    .then(res => {
      console.log("res",res)
    })
  }

  const removeCarer = (id) => {
    dispatch(deleteCarer(id))
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
          <h1>Carers list</h1>
          <Link to="/add_carer">
            <AddButton text="+"/>
          </Link>
        </TitleContainer>
        <CarersContainer>
          {carers &&
          carers.map((carer, index) => {
          return (
            <CarerContainer 
              key={index}
              className={index === currentIndex ? "active" : ""}
              style={{marginBottom: '20px'}}
            >
              <CarerName onClick={() => setActiveCarer(carer, index)} active={currentCarer && (index === currentIndex)}>
                {carer.name.toUpperCase()}
              </CarerName>
              {carer.email &&
                <div>
                  Email: {carer.email}
                </div>
              }
              {carer.phone &&
                <div>
                  Phone: {carer.phone}
                </div>
              }
              {carer.professional &&
                <div>
                  Professional
                </div>
              }
              <CarerButtonsDiv active>
                <Link to={"/edit/carers/" + carer.id}>
                  <CardButton small text="edit"/>
                </Link>
                <CardButton small text="delete" outlined onClick={() => removeCarer(carer.id)}/>
              </CarerButtonsDiv>
            </CarerContainer>
          )})
          }
        </CarersContainer>
        <Spacer medium />
        <Button onClick={toggleVisibility} outlined text="REMOVE ALL"/>
        <Modal display={show} hide={toggleVisibility}>
          <p>Are you sure you want to remove ALL trips?</p>
          <Button text="YES" onClick={removeAllCarers} colour={({theme}) => theme.alert}/>
        </Modal>
      </ListContainer>
    </Template>
  )
}

const TitleContainer = styled.div`
  display: flex;
  width: 300px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`

const CarerName = styled.h4`
  font-weight: ${props => props.active && '700'};
  :hover {
    cursor: pointer;
    font-weight: 700;
  }
`
const CardButton = styled(Button)`
  margin-right: 10px;
  margin-top: 10px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const CarersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
`

const CarerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 30px 20px;
  margin: 10px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.surface1};
  width: 250px;
  border-radius: ${({ theme }) => theme.mediumRadius};
`

const CarerButtonsDiv = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  width: 100%;
`
const AddButton = styled(Button)`
  margin: 15px 15px 15px 25px;
  padding: 8px 14px;
  width: min-content;
  border-radius: ${({ theme }) => theme.largeRadius};
`

export default CarersList