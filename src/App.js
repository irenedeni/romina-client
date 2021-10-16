import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import AddTrip from './components/AddTrip'
import Trip from './components/Trip'
import TripsList from './components/TripsList'
import EditTrip from './components/EditTrip'


function App() {
  return (
    <Router>
      <nav>
        <a href="/trips">
          Romina
        </a>
        <div>
          <li>
            <Link to={"/trips"}>
              Trips
            </Link>
          </li>
          <li>
            <Link to={"/add"}>
              Add Trip
            </Link>
          </li>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={["/", "/trips"]} component={TripsList} />
          <Route exact path={"/add"} component={AddTrip} />
          <Route path={"/trips/:id"} component={Trip} />
          <Route path={"/trips/edit/:id"} component={EditTrip} />
        </Switch>
      </div>
    </Router>
  )
}


export default App;
