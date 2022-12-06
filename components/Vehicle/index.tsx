import { useFilmContext } from '../../contexts'
import styled from 'styled-components'

export const Vehicle = ({vehicle}: {vehicle: SwapiVehicleDataType}) => (
    <ListItem key={vehicle.url}>
        <div>Vehicle Name: {vehicle.name}</div>
        <div>Model: {vehicle.model}</div>
        <div>
            <span>Films:</span>
            {vehicle.films.map(film => <FilmButton key={film} film={film} />)}
        </div>
    </ListItem>
)
const FilmButton = ({film}: {film: APIUrl}): JSX.Element => {
    const { setActiveFilm, reverseFilmLookup } = useFilmContext()
    return <button onClick={() => setActiveFilm(currentFilm => reverseFilmLookup(film) || currentFilm)}>{reverseFilmLookup(film)?.title}</button>
}

const ListItem = styled.li`
    color: brown;
    list-style: none;
`
