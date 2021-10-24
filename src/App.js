import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { AddTrip, Trip, TripsList, EditTrip, AddSlot, AddCarer, 
  EditSlot, AddTask, CarersList, EditCarer, TasksList, EditTask } from "./screens"
import { Navigation } from "./components"
import { navElements } from './lib/navElements'

function App() {
  return (
    <Router>
      <Navigation navElements={navElements} />
      <div>
        <Switch>
          <Route exact path={["/", "/trips"]} component={TripsList} />
          <Route exact path={"/add_trip"} component={AddTrip} />
          <Route path={"/trips/:id"} component={Trip} />
          <Route path={"/edit/trips/:id"} component={EditTrip} />
          <Route path={"/days/:id/slots"} component={AddSlot} />
          <Route path={"/edit/slots/:id"} component={EditSlot} />
          <Route exact path={"/carers"} component={CarersList} />
          <Route exact path={"/add_carer"} component={AddCarer} />
          <Route exact path={"/edit/carers/:id"} component={EditCarer} />
          <Route exact path={"/add_task"} component={AddTask} />
          <Route exact path={"/tasks"} component={TasksList} />
          <Route exact path={"/edit/tasks/:id"} component={EditTask} />
          
        </Switch>
      </div>
    </Router>
  )
}


export default App
