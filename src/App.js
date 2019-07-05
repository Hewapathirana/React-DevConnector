import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUSer, setCurrentUser} from "./actions/authActions";
import store from './store'
import PrivateRoute from './component/common/PrivateRoute';
import './App.css';
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import Landing from "./component/layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from './component/dashboard/Dashboard';
import CreateProfile from './component/create-profile/CreateProfile';
import {clearCurrentProfile} from "./actions/profileActions";
import EditProfile from "./component/edit-profile/EditProfile";
import AddExperience from "./component/add-credentials/AddExperience";
import AddEducation from "./component/add-credentials/AddEducation";

//check for token
    if (localStorage.jwtToken) {
    //set auth token header auth
        setAuthToken(localStorage.jwtToken);
    //decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
    //set user and is authenticated
        store.dispatch(setCurrentUser(decoded));
    // check for expire token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
        //logout user
        store.dispatch(logoutUSer());
            // store.dispatch(logoutUser());
        //clear current profile
        store.dispatch(clearCurrentProfile());
        //redirect to login
        window.location.href = "/login";
    }
}







class App extends Component{
  render() {
    return (

        <Provider store={ store }>
        <Router>
        <div className="App">

          <Navbar/>
           <Route exact  path="/" component={Landing}/>
           <div className="container">
               <Route exact path="/register" component={Register}/>
               <Route  exact path="/login" component={Login}/>
               {/*<Route  exact path="/dashboard" component={Dashboard}/>*/}
               <Switch>
                   <PrivateRoute exact path="/dashboard" component={Dashboard} />
               </Switch>
               <Switch>
                   <PrivateRoute  exact path="/create-profile"  component={CreateProfile}/>
               </Switch>

               <Switch>
                   <PrivateRoute  exact path="/edit-profile"  component={EditProfile}/>
               </Switch>
               <Switch>
                   <PrivateRoute  exact path="/add-experience"  component={AddExperience}/>
               </Switch>
               <Switch>
                   <PrivateRoute  exact path="/add-education"  component={AddEducation}/>
               </Switch>

           </div>
          <Footer/>
        </div>
        </Router>
        </Provider>
    )
  }
}

export default App;
