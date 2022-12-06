import type { PropsWithChildren } from "react";
import { VehicleProvider, FilmProvider } from "../../contexts";

export const Container = ({children, films}: PropsWithChildren<{films: SwapiFilmDataType[]}>): JSX.Element => {
    return (
        <main>
            <FilmProvider films={films}>
                <VehicleProvider>
                    {children}
                </VehicleProvider>
            </FilmProvider>
        </main>
    )
}