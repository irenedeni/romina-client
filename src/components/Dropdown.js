import React from "react"
import styled from "styled-components"

function Dropdown(props) {
  const label = props.name?.split(/(?=[A-Z])/).join(" ")
  let options = props.data?.map((data, index) => {
    const name = data.name ? data.name : data.type
    return (
    <option key={index} value={name}>
      {name[0].toUpperCase() + name.substring(1)}
    </option>
    )
  })
  return (
    <Container>
      <Label>{label[0].toUpperCase() + label.substring(1)}</Label>
      <Select {...props}>
        <Option>
          Select {label.toLowerCase()}
        </Option>
        {options}
      </Select>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
`

const Select = styled.select`
  font-family: "Quicksand", sans-serif;
  font-weight: 300;
  flex:1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 5px;
  border: none; 
  background-color: #e9e6e6;
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.9em) 0.1em;
  background-size:
    5px 5px,
    5px 5px,
    1px 2.6em;
  background-repeat: no-repeat;
`

const Label = styled.label`
  display: flex;
  margin-bottom: 3px;
  font-weight: 400;
  color: ${({ theme }) => theme.textOverlay};
`

const Option = styled.option`
`

export default Dropdown