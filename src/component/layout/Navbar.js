import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logoutUSer} from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileActions";


class Navbar extends Component{


    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUSer();
    }
   render() {

       const {isAuthenticated,user}  = this.props.auth;

       const authLinks = (

           <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                   <Link className="nav-link" to="/dashboard">Dashboard</Link>
               </li>
               <li className="nav-item">
                   <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">

                       <img className="rounded-circle"
                           src={user.avatar} alt={user.username} style={{width:'25px' , marginRigtht: '5px'}}
                            />

                       { ' '}
                       Logout
                   </a>
               </li>

           </ul>

       );


       const guestLinks = (

           <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                   <Link className="nav-link" to="/register">Sign Up</Link>
               </li>
               <li className="nav-item">
                   <Link className="nav-link" to="/login">Login</Link>
               </li>
           </ul>

       );

       return (
           <div>

               {/*navbar starts*/}
               <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                   <div className="container">
                       <Link className="navbar-brand" to="/">DevConnector</Link>
                       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                           <span className="navbar-toggler-icon"></span>
                       </button>

                       <div className="collapse navbar-collapse" id="mobile-nav">
                           <ul className="navbar-nav mr-auto">
                               <li className="nav-item">
                                   <Link className="nav-link" to="/profiles"> Developers
                                   </Link>
                               </li>
                           </ul>
                           {isAuthenticated ? authLinks : guestLinks}
                       </div>
                   </div>
               </nav>

           </div>

       )
   }
}

Navbar.propTypes = {
    logoutUSer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth:state.auth
});

export default connect(mapStateToProps,{logoutUSer,clearCurrentProfile}) (Navbar);
