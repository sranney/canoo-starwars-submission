import styled from 'styled-components'
import { useVehicleContext } from "../../contexts"

export const Pagination = (): JSX.Element => {
    const { nextLink, previousLink, setActiveVehiclePageUrl, loading} = useVehicleContext()
    const disablePreviousBtn = !previousLink || loading
    const disableNextBtn = !nextLink || loading
    return (
        <PaginationContainer role="navigation" aria-label="pagination" style={{border: '4px solid purple'}}>
            {<PaginationBtn disabled={disablePreviousBtn} onClick={() => setActiveVehiclePageUrl(previousLink)} aria-label="previous page">Previous Page</PaginationBtn>}
            {<PaginationBtn disabled={disableNextBtn} onClick={() => setActiveVehiclePageUrl(nextLink)} aria-label="next page">Next Page</PaginationBtn>}
        </PaginationContainer>
    )
}

const PaginationContainer = styled.nav`
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    background-color: white;

`

const PaginationBtn = styled.button`
    margin-right: 4px;
    background-color: blue;
    color: white;
    border: none;
    font-size: 24px;
    padding: 0.25em .5em;
    &:not([disabled]) {
        cursor: pointer;
    }
    &[disabled] {
        background-color: grey;
    }
`