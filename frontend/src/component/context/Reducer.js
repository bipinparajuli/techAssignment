export const initailState={
    search:[],
    snack:false
    }
    
    
    
    function Reducer(state,action) {
        console.log(action)
    switch(action.type){
        case 'SEARCH':
            //logic for adding
            return {...state,search:action.item}
            
        case 'SNACK':
            return {...state,snack:action.item}
                 
            
                    default:
                    return state
    }
    
    }
    
    
    export default Reducer
    