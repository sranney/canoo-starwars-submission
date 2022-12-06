import React from 'react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Pagination } from '../components/Container/Pagination'
import { Search } from '../components/Container/Search'
import { FilmDetail } from '../components/FilmDetail'
import { VehicleList } from '../components/Vehicle/VehicleList'

export default function Home({films}: {films: SwapiFilmDataType[]}): JSX.Element {
  return (
    <>
      <header>
        <h1>Star Wars Vehicles</h1>
      </header>
      <Container films={films}>
        <Search />
        <FlexContainer>
          <VehicleList />
          <FilmDetail />
        </FlexContainer>
        <Pagination />
      </Container>
    </>
  )
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const getFilms = async () => {
  try {
    const response = await fetch('https://swapi.py4e.com/api/films')
    const parsedResponse = await response.json()
    return parsedResponse.results
  } catch(error) {
    console.error('there is an error with the api or how you are fetching the data from the api.')
    return []
  }
}

export async function getStaticProps() {
  const films = await getFilms()
  return {
    props: { films }
  }
}