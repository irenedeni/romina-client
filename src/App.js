import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { AddTrip, Trip, TripsList, EditTrip, AddSlot } from "./screens"
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
        </Switch>
      </div>
    </Router>
  )
}


export default App
