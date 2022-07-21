import {React} from "react";

const ReadRowResults = ({geoEvent}) => {
    return(
        <tr key={geoEvent.id}>
            <td>{geoEvent.properties.type}</td>
            <td>{geoEvent.properties.place}</td>
            <td>{geoEvent.geometry.coordinates[1]}</td>
            <td>{geoEvent.geometry.coordinates[0]}</td>
            <td>{geoEvent.geometry.coordinates[2]}</td>
            <td>{geoEvent.properties.mag}</td>
            <td>{geoEvent.properties.magType}</td>
            <td>{new Date(geoEvent.properties.time).toISOString()}</td>
            <td>{geoEvent.properties.felt != null? geoEvent.properties.felt : "unknown"}</td>
            <td>{geoEvent.properties.tsunami == 1 ? "true" : "false"}</td>
            <td>{geoEvent.id}</td>
        </tr>
    )
}

export default ReadRowResults