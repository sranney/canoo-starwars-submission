import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from 'react'

/**
 * TODO: With time permitting, would be nice to make this more generic for a lot of use cases
 * unfortunately, because of a hydration issue had to move a lazy initializer for value state here to be in a useEffect instead
 * would be nice to figure this issue out and move this back to the lazy initializer
 * because that's not really the point of this exercise, I'm not spending much time on this
 */

/**
 * 
 * more generic case which isn't quite working because of a next error
 *   export const useLocalStorageState = <T>(storageKey: string, initialValue?: T): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
 *       const [value, setValue] = useState<T | undefined>(() => {
 *           if(typeof window !== 'undefined'){
 *               const retrievedValue = localStorage.getItem(storageKey)
 *               if(retrievedValue) {
 *                   return JSON.parse(retrievedValue)
 *               }
 *               return retrievedValue || initialValue
 *           }
 *           return initialValue
 *       })
 *
 *       useEffect(() => {
 *           // effect for setting updates to localStorage  
 *           if(value) {
 *               localStorage.setItem(storageKey, JSON.stringify(value))
 *           }
 *       }, [storageKey, value])
 *   
 *       return [value, setValue]
 *   }
 */

export const useFilmLocalStorageState = (): [SwapiFilmDataType | undefined, Dispatch<SetStateAction<SwapiFilmDataType | undefined>>] => {
    const [film, setFilm] = useState<SwapiFilmDataType | undefined>()

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const retrievedValue = localStorage.getItem('film')
            if(retrievedValue) {
                setFilm(JSON.parse(retrievedValue))
            }
        }
    }, [])

    useEffect(() => {
        // effect for setting updates to localStorage  
        if(film) {
            localStorage.setItem('film', JSON.stringify(film))
        }
    }, [film])

    return [film, setFilm]
}