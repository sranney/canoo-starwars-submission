import { useCallback, useMemo, SetStateAction, useState } from 'react'
import type {Dispatch, PropsWithChildren} from 'react'
import { createContext } from './createContext'
import { useFilmLocalStorageState } from '../utils/useLocalStorageState'

type FilmContextShape = {
    activeFilm: SwapiFilmDataType | undefined;
    reverseFilmLookup: (filmUrl: APIUrl) => SwapiFilmDataType | undefined;
    setActiveFilm: Dispatch<SetStateAction<SwapiFilmDataType | undefined>>
}

// we don't have a need for a defaultValue, some information is going to be defined immediately prior to using the Provider
export const [useFilmContext, Provider] = createContext<FilmContextShape>()

type FilmProviderProps = PropsWithChildren<{films: SwapiFilmDataType[]}>

export const FilmProvider = ({children, films}: FilmProviderProps): JSX.Element => {
    const [activeFilm, setActiveFilm] = useFilmLocalStorageState()
    // using useCallback because of its use in the dependency array for ProviderValue calculation
    // dependency array relies on referential equality checks to determine whether or not to run operations again
    const reverseFilmLookup = useCallback((filmUrl: APIUrl):SwapiFilmDataType | undefined => {
        // although we hope that the films listed in the films property of a vehicle object will all be valid URLs we can't know for sure
        // to prevent code breakage, going to rely on TypeScript's safety and use type guards and not assume anything
        const selectedFilm: SwapiFilmDataType | undefined = films.find(film => film.url === filmUrl)
        
        if (typeof selectedFilm === 'undefined') {
            throw new Error('There seems to be a problem with the film chosen, please try again')
        }

        return selectedFilm
    }, [films])

    // using useMemo because of the referential equality check that the Provider does to determine updates
    const ProviderValue = useMemo(() => ({
        activeFilm,
        setActiveFilm,
        reverseFilmLookup
    }), [activeFilm, setActiveFilm, reverseFilmLookup])
    
    return (
        <Provider value={ProviderValue}>
            {children}
        </Provider>
    )
}