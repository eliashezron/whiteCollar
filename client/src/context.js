import {createContext, useEffect, useReducer} from 'react'
import Reducer from './Reducers/Reducer'
const initialState = {
    user:JSON.parse(localStorage.getItem('user')) || null,
    posts: [],
    isLoading:false,
    error:false
}

export const Context = createContext(initialState)

export const ContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(Reducer, initialState)
    useEffect(() => {
        localStorage.setItem('User', JSON.stringify(state.user))

    }, [state.user])

    return(
        <ContextProvider
            value={{
                user:state.user,
                isLoading:state.isLoading,
                error:state.error,
                dispatch
            }}>
                {children}
            </ContextProvider>
    )
}