import type { ChangeEvent } from "react"
import { useVehicleContext } from "../../contexts"
import { useDebouncedCallback } from "../../utils/useDebouncedCallback"

export const Search = (): JSX.Element => {
    const { setActiveVehiclePageUrl, loading } = useVehicleContext()

    const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => setActiveVehiclePageUrl(`https://swapi.py4e.com/api/vehicles/${event.target.value.length > 0 ? `?search=${event.target.value}` : ''}`)

    const debouncedOnChangeEventHandler = useDebouncedCallback(onChangeEventHandler, 500)

    return (
        <>
            <label htmlFor="search">Search</label>
            <input disabled={loading} aria-label="vehicle search input" id="search" onChange={debouncedOnChangeEventHandler} />
        </>
    )
}