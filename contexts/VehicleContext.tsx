import { useMemo } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext } from './createContext'
import { useDataFetcher } from '../utils/useDataFetcher'
import { ErrorMessage } from '../components/Container/ErrorMessage'
import { Loading } from '../components/Container/Loading'

type VehicleContextShape = {
    vehiclePageResults: SwapiVehicleDataType[]
    nextLink: APIUrl
    previousLink: APIUrl
    loading: boolean
    setActiveVehiclePageUrl: Dispatch<SetStateAction<APIUrl>>
}

export const [useVehicleContext, Provider] = createContext<VehicleContextShape>()

const initialDataFetchUrl = 'https://swapi.py4e.com/api/vehicles'

export const VehicleProvider = ({children}: {children: ReactNode}): JSX.Element => {
    const {results: vehiclePageResults, nextLink, previousLink, error, loading, setActiveUrl: setActiveVehiclePageUrl} = useDataFetcher(initialDataFetchUrl)
    /**
     * TODO: 
     * because react 18 updates now have components mounting twice, all hooks are ran twice
     * this means that the useReducer returned values are created twice
     * because vehiclePageResults is an array, the dependency array recognizes each instance as a new array
     * this causes the useMemo to run multiple times
     * it would be good to figure out a way to improve this
     */

    // using useMemo because of the referential equality check that the Provider does to determine updates
    const ProviderValue = useMemo(() => ({
            vehiclePageResults,
            nextLink,
            previousLink,
            loading,
            setActiveVehiclePageUrl
        }), [
            vehiclePageResults,
            nextLink,
            previousLink,
            loading,
            setActiveVehiclePageUrl
        ]
    )
    return (
        <Provider value={ProviderValue}>
            {error ? <ErrorMessage error={error}/> : null}
            {!error ? children : null}
        </Provider>
    )
}