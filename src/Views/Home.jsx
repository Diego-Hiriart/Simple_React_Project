import {React, useState, useEffect, Fragment} from "react";
import ReadRowResults from "./Components/ReadRowResults";
import '../css/home.css';

function Home(){
    const urlUsgsAPI = "https://earthquake.usgs.gov/fdsnws/event/1/query";
    const defaultParams = {//A 1200 km radius around the latitude and logitude
        format: "geojson",
        latitude: -1.7,
        longitude: -83,
        maxradiuskm: 1200
    };
    const [searchParams, setSearchParams] = useState({
        format: "geojson",
        latitude: 0,
        longitude: 0,
        maxradiuskm: 0,
        minmagnitude: 0,
        maxmagnitude: 11,//Events higher than 10 are impossible, see: https://www.usgs.gov/faqs/can-megaquakes-really-happen-magnitude-10-or-larger
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString()
    });
    const [geoEvents, setGeoEvents] = useState(null);
    const [dataReceived, setDataReceived] = useState(false)
    /*Listeners to validate form data, they are in a useEffect so that they dont execute before the elements 
    exist and the [name]Field vars are null end up being (in a functional component useEffect is like a componentDidMount)*/
    useEffect(() => {
        var radiusField = document.getElementById("radiusInput");
        var minMagField = document.getElementById("minMagInput");
        var maxMagField = document.getElementById("maxMagInput");
        radiusField.addEventListener("input", () => {
            if(radiusField.value > 20001.6){
                radiusField.setCustomValidity("Radius can't be over 20001.6");
                radiusField.reportValidity();
            }else{
                radiusField.setCustomValidity("");
            }
        })
    
        minMagField.addEventListener("input", () => {
            if(minMagField.value < 0 || minMagField.value >= 10){
                minMagField.setCustomValidity("Magnitude cannot be: less than 0, 10 or more");
                minMagField.reportValidity();
            }else{
                minMagField.setCustomValidity("");
            }
        })
    
        maxMagField.addEventListener("input", () => {
            if(maxMagField.value >= 10 || maxMagField.value < 0){
                maxMagField.setCustomValidity("Magnitude cannot be: less than 0, 10 or more");
                maxMagField.reportValidity();
            }else{
                maxMagField.setCustomValidity("");
            }
        })
    })

    useEffect(() => {
        document.title = "Diego Hiriart - React Project";
        getDefaultData();
    }, [])

    //Creates a string like 'format=geojson&minlatitude=-6&maxlatitude=3&minlongitude=-92&maxlongitude=-1' to add to the url
    const paramsToString = (params) => {
        var queryString = "?"
        var paramsCount = 0
        for (const [key, value] of Object.entries(params)){
            if(paramsCount < Object.keys(params).length-1){
                queryString += key+"="+value+"&"
            }else{
                queryString += key+"="+value
            }
            paramsCount++;
        }
        return queryString;
    }

    const getDefaultData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlUsgsAPI+paramsToString(defaultParams), requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setGeoEvents(json.features));
                setDataReceived(true);
            }else {
                console.log("GET earthquake data failed");
            }
        })
    }

    const handleFormChange = (event) => {
        var fieldValue = event.target.value;//Get the value of the field
        event.preventDefault();
        
        const fieldName = event.target.getAttribute("name");//Get the name field

        const newFormData = {...searchParams}//Get the current state of filterForm
        newFormData[fieldName] = fieldValue//Update the value of a field

        setSearchParams(newFormData);
    }


    const filterRequest = async (filter) =>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: filter
        };
        console.log(JSON.stringify(filter))
        await fetch(urlUsgsAPI+paramsToString(filter), requestOptions)
            .then(res => {
                if(res.ok){
                    res.json()
                    .then(json => setGeoEvents(json.features))
                }else {
                    console.log("Filter error");
                }
            });
    }

    const submitFilter = (event) => {
        event.preventDefault();

        const filter = {
            format: searchParams.format,
            latitude: searchParams.latitude,
            longitude: searchParams.longitude,
            maxradiuskm: searchParams.maxradiuskm,
            minmagnitude: searchParams.minmagnitude,
            maxmagnitude: searchParams.maxmagnitude,
            starttime: searchParams.starttime,
            endtime: searchParams.endtime
        }

        filterRequest(filter)
    }

    let content = 
    <div class="page">
        <div class="header">
            <h4>Diego Hiriart León</h4>
            <h4>Web Engineering</h4>
            <h4>UDLA</h4>
        </div>
        <div class="title">
            <h1>React Project - USGS Earthquake Catalog</h1>
            <h2>A simple React app that consumes the USGS Earthquake Catalog API</h2>
            <h3>Find out more about the <a href="https://earthquake.usgs.gov/fdsnws/event/1/">USGS Earthquake Catalog API</a></h3>
            <p>By default, this web page will get earthquake information for Ecuador and its sorrounding area for the last 30 days. The location is set as this 
                app's default with latitude=-1.7, longitude=-83, and a radius of 1200 km sorund those coordinates; the time period is in UTC and it's the API's default. 
                You can search for specific data by inserting latitude, longitude, the radius aorund that point, minimun and maximun maginitude of the events, start and end time.</p>
        </div>
        <main class="events-data">
            <h3>Geological event search</h3>
            <div class="filter">
                <form class="filter-form" onSubmit={submitFilter}>
                    <div class="form-group">
                        <label>Latitude </label>
                        <input type="text" name="latitude" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Longitude </label>
                        <input type="text" name="longitude" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Radius in km </label>
                        <input type="text" id="radiusInput" name="maxradiuskm" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Min magnitude </label>
                        <input type="text" id="minMagInput" name="minmagnitude" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Max magnitude </label>
                        <input type="text" id="maxMagInput" name="maxmagnitude" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Start Date UTC</label>
                        <input type="date" name="starttime" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-group">
                        <label>End Date UTC</label>
                        <input type="date" name="endtime" required onChange={handleFormChange}></input>
                    </div>
                    <div class="form-buttons">
                        <button type="submit">Search</button>
                        <button type="button" onClick={getDefaultData}>Clear search</button>
                    </div>             
                </form>
            </div>
            <div class="results">
                <table>
                    <thead>
                        <tr>
                            <th>Type of event</th>
                            <th>Location</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Depth (km)</th>
                            <th>Magnitude</th>
                            <th>Magnitude type</th>
                            <th>Date and Time UTC</th>
                            <th>Reports that event was felt</th>
                            <th>Oceanic region</th>
                            <th>Event ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {geoEvents &&
                            geoEvents.map((geoEvent) => (
                                    <ReadRowResults geoEvent = {geoEvent}/>//If there were multiple components to render in this tbody, they should be inside a Fragment
                            ))
                        }
                    </tbody>
                </table>             
            </div>
        </main>
        <div class="footer">
            <div>
                <p>Code & Resources</p>
                <ul>
                    <li><a href="https://github.com/Diego-Hiriart/Simple_React_Project">React app source code</a></li>
                    <li><a href="https://earthquake.usgs.gov/fdsnws/event/1/">Earthquake Catalog API documentation</a></li>
                    <li><a href="https://www.usgs.gov/faqs/can-megaquakes-really-happen-magnitude-10-or-larger">Maximun earthquake magnitude</a></li>
                    <li><a href="https://react-project-hiriart.herokuapp.com/">Deployed app in Heroku</a></li>
                </ul>
            </div>
            <div>
                <p>Contact</p>
                <ul>
                    <li><a href="mailto:hiriart.leon.d@gmail.com">hiriart.leon.d@gmail.com</a></li>
                    <li><a href="https://github.com/Diego-Hiriart">GitHub</a></li>
                </ul>
            </div>
        </div>
    </div>

    return(
        <Fragment>
            {content}
        </Fragment>
    )
}

export default Home;