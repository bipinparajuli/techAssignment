export const initailState={
    search:[],
    update:[],
    length:[1],
    snack:false,
    delet:false
    }
    
    
    
    function Reducer(state,action) {
        // console.log(state)
    switch(action.type){
        case 'SEARCH':
            //logic for adding
            return {...state,search:action.item}
            
        case 'SNACK':
            return {...state,snack:action.item}

            case 'DELETE':
            return {...state,delet:action.item}

            
            case 'UPDATE':
                return {...state,update:[...state.update,action.item]}    
                 
                case 'LENGTH':
                    return {...state,length:action.item}    
                    
                    default:
                    return state
    }
    
    }
    
    
    export default Reducer
    