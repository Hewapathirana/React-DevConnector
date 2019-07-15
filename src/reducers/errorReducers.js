import {GET_ERRORS, GET_PROFILES_ERRORS} from "../actions/type";
import {logoutUSer500, setCurrentUser} from "../actions/authActions";
import {clearCurrentProfile} from "../actions/profileActions";
import store from "../store";


const initialState = {

}

export default function (state = initialState,action) {
    switch (action.type) {
        case GET_ERRORS:
            console.log(" action.payload.errorcode ************ ",action.errorcode.status);
            if(action.errorcode.status ==500){
                //logout user
                store.dispatch(logoutUSer500());
                // store.dispatch(logoutUser());
                //clear current profile
                //store.dispatch(clearCurrentProfile());
                //redirect to login
                window.location.href = "/500";

            }


            else {

                return action.payload;


            }
        case GET_PROFILES_ERRORS:
            if(action.errorcode.status ==500){
                //logout user
                store.dispatch(logoutUSer500());
                // store.dispatch(logoutUser());
                //clear current profile
                //store.dispatch(clearCurrentProfile());
                //redirect to login
                window.location.href = "/500";
                console.log("inside if");



            }


            else {
                console.log(" action.payload ",action.payload.status);

                return action.payload;


            }



        default:
            return state;
    }

}
