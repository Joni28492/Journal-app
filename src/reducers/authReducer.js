import { types } from "../types/types";

/*
    {//estructura del objeto
        uid: sfjalksdjf0324908,
        name: 'Joni'
    }
  
*/



export const authReducer = (state={}, action) =>{

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
    
        case types.logout:
            return {}

        default:
            return state;
    }
}