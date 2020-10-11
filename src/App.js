import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import SignUp from './Components/SignUp/SignUp';
import { extractSessionStorage } from './Components/SessionStorageMechanism/SessionStorageMechanism';
import VolunteerTaskWindow from './Components/VoluteerTaskWindow/VolunteerTaskWindow';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import VolunteerPanel from './Components/VolunteerPanel/VolunteerPanel';
import AddEvent from './Components/AddEvent/AddEvent';

export const context = createContext();
export const signedUserContext = createContext();


function App() {

  const [isHome, setIsHome] = useState(false);
  const [activeCard, setActiveCard] = useState(extractSessionStorage('activecard') || {});
  const [signedUser, setSignedUser] = useState(extractSessionStorage('signeduser') || {});
  const [nameOnNotification, setNameOnNotification] = useState(false);
  const [token, setToken] = useState(extractSessionStorage('authToken' || ''));

  return (
    <Router>
      <signedUserContext.Provider value={[signedUser, setSignedUser, nameOnNotification, setNameOnNotification]}>
        <context.Provider value={[isHome, setIsHome, activeCard, setActiveCard, token, setToken]}>
          <NavigationBar></NavigationBar>
          <Switch>
            <Route exact path='/'>
                <Home></Home>
            </Route>

            <Route path='/signin'>
              <Login />
            </Route>

            <Route path='/admin'>
              <VolunteerPanel/>
            </Route>

            <Route path='/volunteerList'>
              <VolunteerPanel/>
            </Route>

            <Route path="/eventEntry">
              <AddEvent/>
            </Route>

            <PrivateRoute path="/signup">
              <SignUp />
            </PrivateRoute>

            <PrivateRoute path="/registeredProfile">
              <VolunteerTaskWindow/>
            </PrivateRoute>
          </Switch>
        </context.Provider>
      </signedUserContext.Provider>
    </Router>
  );
}

export default App;
