import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Button } from "./index"

const Modal = ({ display, hide, children }, props) => 
  display ?
    (<Container>
      <Content>
        {children}
        <div>
          <Button small {...props} onClick={hide} text="close" color="#9d9d9d" style={{margin: "30px 0px 0px 0px"}}/>
        </div>
      </Content>
    </Container>
   )
   : null


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({theme})=> theme.surface2};
  position: absolute;
  z-index: 2;
  padding: 20px;
  bottom: 30px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075);
  border-radius: 5px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`

export default Modal