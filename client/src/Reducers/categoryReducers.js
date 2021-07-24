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
export const followcategory= (state={ }, action)=>{
    switch(action.type){
        case 'CATEGORY_FOLLOW_START':
            return{
                isLoading:true,
            };
        case 'CATEGORY_FOLLOW_SUCCESS':
            return{
                isLoading:true,
                success:true,
            };
        case 'CATEGORY_FOLLOW_FAILURE':
            return{
                isLoading:false,
                error:action.payload
            }
        case "CATEGORY_FOLLOW_RESET":
            return {};
        default:
            return state
    }
}