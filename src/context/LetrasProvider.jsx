import { useState, createContext } from 'react'
import axios from 'axios'

const LetrasContext = createContext()

const LetrasProvider = ({children}) => {
    const [alerta, setAlerta] = useState('')
    const [letra, setLetra] = useState('')
    const [cargando, setCargando] = useState(false)

    const busquedaLetra = async busqueda => {
        setCargando(true)

        try {
            const { artista, cancion } = busqueda
            const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`

            // --> request normal con fetch
            // const request = await fetch(url)
            // const lyrics = await request.json()

            // --> request con axios
            const { data: { lyrics } } = await axios.get(url)
            setLetra(lyrics)
            setAlerta('')
        } catch (err) {
            setAlerta('Canción No Encontrada')
            console.log(err)
        }

        setCargando(false)
    }

    return (
        <LetrasContext.Provider
            value={{
                alerta,
                setAlerta,
                busquedaLetra,
                letra, 
                cargando
            }}
        >
            {children}
        </LetrasContext.Provider>
    )
}

export {
    LetrasProvider
}

export default LetrasContext