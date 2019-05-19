import {GET_ERRORS } from "./type";
import  axios from "axios";


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
