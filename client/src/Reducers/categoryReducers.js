export const categoriesReducer = (state={categories:[]}, action)=>{
    switch(action.type){
        case 'CATEGORIES_START':
            return{
                isLoading:true,
                categories:[],
            };
            case 'CATEGORIES_SUCCESS':
            return{
                isLoading:false,
                categories:action.payload
            };
        case 'CATEGORIES FAILURE':
            return{
                isLoading:false,
                error:action.payload
            };
        default:
            return state
    }
}