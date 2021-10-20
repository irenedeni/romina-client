import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import AddTrip from './screens/AddTrip'
import Trip from './screens/Trip'
import TripsList from './screens/TripsList'
import EditTrip from './screens/EditTrip'
import Navigation from './components/Navigation'
import { navElements } from './lib/navElements'

function App() {
  console.log(navElements)
  return (
    <Router>
      <Navigation navElements={navElements} />
      <div>
        <Switch>
          <Route exact path={["/", "/trips"]} component={TripsList} />
          <Route exact path={"/add"} component={AddTrip} />
          <Route path={"/trips/:id"} component={Trip} />
          <Route path={"/edit/trips/:id"} component={EditTrip} />
        </Switch>
      </div>
    </Router>
  )
}


export default App
