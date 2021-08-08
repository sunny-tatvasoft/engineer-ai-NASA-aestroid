import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AsteroidData from "./components/asteroid/AsteroidData";
import AsteroidForm from "./components/asteroid/AsteroidForm";

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/asteroid">
            <AsteroidData/>
          </Route>
          <Route exact path="/">
            <AsteroidForm/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



export default App;
