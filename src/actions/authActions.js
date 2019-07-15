import {GET_ERRORS,SET_CURRENT_USER,HTTP_500_ERROR } from "./type";
import  axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

//register user
export const registeruser = (userData,history) => dispatch =>
{
    axios.post('/api/users/register',userData)
        .then(res => history.push('/login'))
        .catch(err =>
           dispatch({
              type: GET_ERRORS,
              payload: err.response.data
           })
        );
};

//login-get user token
export const loginUser = userData => dispatch =>{
  axios.post('/api/users/login',userData)
      .then(res =>{
             //save to localstorage
          const  {token} =res.data;
          // set token to localstorage
          localStorage.setItem('jwtToken' ,token);
          //set token to auth header
          setAuthToken(token);
          //decode token to get uswer data

          const decoded = jwt_decode(token);
          // set current user

          dispatch(setCurrentUser(decoded));


      }).catch(err =>   dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
      errorcode : err.response
  }));
};


// set logged in user

export const setCurrentUser =(decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


//log user out

export const logoutUSer =  () => dispatch =>{
    dispatch(setCurrentUser({}));
    //remove token fromlocal storage
    localStorage.removeItem('jwtToken');

    //remove auth header for future req
    setAuthToken(false);
    //set the current user to empty object which will set is authenticated to false



}






//for 500 internal server error
export const logoutUSer500 =  () => dispatch =>{
    //dispatch(setCurrentUser({}));
    //remove token fromlocal storage
    localStorage.removeItem('jwtToken');

    //remove auth header for future req
    setAuthToken(false);
    //set the current user to empty object which will set is authenticated to false



}






//500 and 401 error handelling
/*
const execute500Handler = (props) => {
    return {
        type: HTTP_500_ERROR,
        props: props
    }
}

export const handleHTTPError = (error, props) => {

     if (error.response.status === 500) {
        return execute500Handler(props);
    }

}
*/
