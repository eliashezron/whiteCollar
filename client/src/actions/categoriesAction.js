import axios from 'axios'
export const getAllCategories = () => async(dispatch)=>{
    try{
        dispatch({type: 'CATEGORIES_START'})
        const {data} = await axios.get('/api/categories')
        dispatch({
            type:'CATEGORIES_SUCCESS',
            payload:data
        }) 
        localStorage.setItem('categoriesInfo',JSON.stringify(data))

    }catch(error){
        console.log(error)
        dispatch({
            type:'CATEGORIES_FAILURE',
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
