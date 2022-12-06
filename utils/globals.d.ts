type APIUrl = `https://swapi.py4e.com/api/${string}` | null
type NumericString = `${number}`
const unknown = 'unknown'

type SwapiVehicleDataType = {
  cargo_capacity: NumericString | unknown
  consumables: `${NumericString} ${'day'|'days'|'month'|'months'|'year'|'years'}` | unknown
  cost_in_credits: NumericString | unknown
  created: string
  crew: NumericString | unknown
  edited: string
  length: NumericString | unknown
  manufacturer: string
  max_atmosphering_speed: NumericString | unknown
  model: string
  name: string
  passengers: NumericString | unknown
  pilots: APIUrl[]
  films: APIUrl[]
  url: APIUrl
  vehicle_class: string
}

type SwapiFilmDataType = {
  title: string
  episode_id: number
  opening_crawl: string 
  director: string
  producer: string
  release_date: string 
  characters: APIUrl[]
  planets: APIUrl[]
  starships: APIUrl[] 
  vehicles: APIUrl[]
  species: APIUrl[]
  created: string 
  edited: string 
  url: APIUrl
}

type PaginationInfo = {
  count: number
  next: APIUrl
  previous: APIUrl
}
type FetchSuccessType = PaginationInfo & { 
  results: SwapiVehicleDataType[]
}

type Actions = {type: 'START_FETCHING'} 
  | {type: 'FETCH_SUCCESS', payload: FetchSuccessType} 
  | {type: 'FETCH_ERROR', payload: {error: string}}
