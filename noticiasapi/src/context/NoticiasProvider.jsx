/* eslint-disable react/prop-types */

import { useState, createContext, useEffect } from "react";
import axios from 'axios'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)
    
    useEffect(() => {
        const consultarAPI = async () => {
            try { 
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
                const { data } = await axios(url)

                setNoticias(data.articles)
                setTotalNoticias(data.totalResults)
                setPagina(1)
            } catch(error) {
                console.log(error)
            }
        } 
        consultarAPI()
    }, [categoria])

    useEffect(() => {
        const consultarAPI = async () => {
            try { 
                const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
                const { data } = await axios(url)

                setNoticias(data.articles)
                setTotalNoticias(data.totalResults)
    
            } catch(error) {
                console.log(error)
            }
        } 
        consultarAPI()
    }, [pagina])


    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e, valor) => {
        setPagina(valor)
    }
    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
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