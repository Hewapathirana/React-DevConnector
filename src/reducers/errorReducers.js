import {GET_ERRORS, GET_PROFILES_ERRORS} from "../actions/type";
import {logoutUSer500, setCurrentUser} from "../actions/authActions";
import {clearCurrentProfile} from "../actions/profileActions";
import store from "../store";


const initialState = {

}

export default function (state = initialState,action) {
    switch (action.type) {
        case GET_ERRORS:

            if(action.payload.toString().split(" ").includes("Proxy")  && action.payload.toString().split(" ").includes("error:")){
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
            if(action.payload.toString().split(" ").includes("Proxy")  && action.payload.toString().split(" ").includes("error:")){
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
                console.log(" outside if");

                return action.payload;


            }



        default:
            return state;
    }

}
