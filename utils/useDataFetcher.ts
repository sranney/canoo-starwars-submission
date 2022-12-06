import { useEffect, useReducer, useState } from "react"

type StateShape = {
  count: number
  nextLink: APIUrl
  previousLink: APIUrl
  results: SwapiVehicleDataType[]
  error: string
   loading: boolean 
}

const initialState: StateShape = {
  count: 0,
  nextLink: null,
  previousLink: null,
  results: [],
  error: '',
  loading: false
}
/**
 * this could be made more generic 
 * if we wanted to expand the application's purposes to pull in data from different fields, such as people
 * for now, this is purposed for vehicle data
 */
const swapiDataReducer = (state: StateShape = initialState, action: Actions):StateShape => {
  if (action.type === 'START_FETCHING') {
    return {
      count: 0,
      nextLink: null,
      previousLink: null,
      results: [],
      error: '',
      loading: true
    }
  } else if (action.type === 'FETCH_SUCCESS') {
    return {
      count: action.payload.count,
      nextLink: action.payload.next,
      previousLink: action.payload.previous,
      results: action.payload.results,
      error: '',
      loading: false
    }
  } else if (action.type === 'FETCH_ERROR') {
    return {
      count: 0,
      nextLink: null,
      previousLink: null,
      results: [],
      error: action.payload.error,
      loading: false
    }
  }
  return state
}
  
export const useDataFetcher = (url: APIUrl) => {
  const [activeUrl, setActiveUrl] = useState(url)
  const [{results, nextLink, previousLink, error, loading}, dispatch] = useReducer(swapiDataReducer, initialState)
  useEffect(() => {
    if(activeUrl) {
      dispatch({type: 'START_FETCHING'})
      fetch(activeUrl)
      .then(res => res.json())
      .then((res: FetchSuccessType) => dispatch({type: 'FETCH_SUCCESS', payload: res }))
      .catch(error =>  dispatch({type: 'FETCH_ERROR', payload: {error: error.message}}))
    }
  }, [activeUrl])
  return {results, nextLink, previousLink, error, loading, setActiveUrl}
}