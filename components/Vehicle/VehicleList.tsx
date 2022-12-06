import { useVehicleContext } from '../../contexts'
import styled from 'styled-components'
import { Loading } from '../Container/Loading'
import { Vehicle } from '../Vehicle'

export const VehicleList = (): JSX.Element => {
    const {vehiclePageResults: vehicles, loading} = useVehicleContext()
    return loading ? <Loading /> : <List>
        {vehicles.map(vehicle => <Vehicle key={vehicle.url} vehicle={vehicle} />)}
    </List>
}

const List = styled.ul`
    list-style: none;
`




