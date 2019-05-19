import {TEST_DISPATCH} from "./type";


export const registeruser =(userData) =>
{
    return {type: TEST_DISPATCH,
    payload:userData};
}
