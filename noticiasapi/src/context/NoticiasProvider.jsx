/* eslint-disable react/prop-types */

import { useState, createContext, useEffect } from "react";
import axios from 'axios'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    
    useEffect(() => {
        const consultarAPI = async () => {
            try { 
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
                const { data } = await axios(url)
                setNoticias(data.articles)
            } catch(error) {
                console.log(error)
            }
        } 
        consultarAPI()
    }, [categoria])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext