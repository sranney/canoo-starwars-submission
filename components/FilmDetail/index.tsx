import { useFilmContext } from "../../contexts"

export const FilmDetail = (): JSX.Element | null => {
    const {activeFilm} = useFilmContext()
    return activeFilm ? (
        <section aria-label="film details">
            <h2>Film Detail:</h2>
            <div>Title: {activeFilm.title}</div>
            <div>Director: {activeFilm.director}</div>
            <div>Producer: {activeFilm.producer}</div>
            <div>Release Date: {activeFilm.release_date}</div>
        </section>
    ) : null
}