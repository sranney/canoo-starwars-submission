import { useCallback, useRef } from "react"
import type { ChangeEventHandler } from 'react'

// TODO: this is purposed for the specific use case needed. May be good to look at making this more general through refinement of the generic syntax. Specifically the type on the debouncedCallback
export const useDebouncedCallback = <T>(
    debouncedCallback: (arg: T) => void,
    debounceDelay: number
):(arg: T) => void => {
    let timer = useRef<ReturnType<typeof setTimeout>>()
    return useCallback((...args) => {
        const delayedFunction = () => {
            debouncedCallback(...args)
        }

        clearTimeout(timer.current)
        timer.current = setTimeout(delayedFunction, debounceDelay)
    }, [debouncedCallback, debounceDelay])
}