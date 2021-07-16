export const categoriesReducer = (state={categories:[]}, action)=>{
    switch(action.type){
        case 'CATEGORIES_START':
            return{
                isLoading:true,
                categoriesInfo:[],
            };
            case 'CATEGORIES_SUCCESS':
            return{
                isLoading:false,
                categoriesInfo:action.payload
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