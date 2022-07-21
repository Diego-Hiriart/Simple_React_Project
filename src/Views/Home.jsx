import {React, useState, useEffect, Fragment} from "react";
import ReadRowResults from "./Components/ReadRowResults";
import '../css/home.css';

function Home(){
    const urlUsgsAPI = "https://earthquake.usgs.gov/fdsnws/event/1/query";
    const defaultParams = {
        format: "geojson",
        minlongitude: -92,
        maxlongitude: -74,
        minlatitude: -6,
        maxlatitude: 3
    };
    const [searchParams, setSearchParams] = useState({
        format: "geojson",
        minlongitude: 0,
        maxlongitude: 0,
        minlatitude: 0,
        maxlatitude: 0,
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString()
    });
    const [geoEvents, setGeoEvents] = useState(null);
    const [dataReceived, setDataReceived] = useState(false)

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
            minlatitude: searchParams.minlatitude,
            maxlatitude: searchParams.maxlatitude,
            minlongitude: searchParams.minlongitude,
            maxlongitude: searchParams.maxlongitude,
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
            <h3>Find out more about the API here: <a href="https://earthquake.usgs.gov/fdsnws/event/1/">https://earthquake.usgs.gov/fdsnws/event/1/</a></h3>
            <p>By default, this web page will get earthquake information for Ecuador and its sorrounding area for the last 30 days (the location is set as this 
                app's default, the time period is in UTC and it's the API's default). You can search for specific data by inserting minimun and maximun longitude and latitude, as well as start and end time.</p>
        </div>
        <main class="events-data">
            <form class="filter-form" onSubmit={submitFilter}>
                <div class="form-group">
                    <label>Min longitude </label>
                    <input type="text" name="minlongitude" required onChange={handleFormChange}></input>
                </div>
                <div class="form-group">
                    <label>Max longitude </label>
                    <input type="text" name="maxlongitude" required onChange={handleFormChange}></input>
                </div>
                <div class="form-group">
                    <label>Min latitude </label>
                    <input type="text" name="minlatitude" required onChange={handleFormChange}></input>
                </div>
                <div class="form-group">
                    <label>Max latitude </label>
                    <input type="text" name="maxlatitude" required onChange={handleFormChange}></input>
                </div>
                <div class="form-group">
                    <label>Start Date </label>
                    <input type="date" name="starttime" required onChange={handleFormChange}></input>
                </div>
                <div class="form-group">
                    <label>End Date </label>
                    <input type="date" name="endtime" required onChange={handleFormChange}></input>
                </div>                   
                <button type="submit" onChange={handleFormChange}>Search</button>
            </form>
            <div class="results">
                <table>
                    <thead>
                        <th>Type of event</th>
                        <th>Location</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Depth (km)</th>
                        <th>Magnitude</th>
                        <th>Time</th>
                        <th>Reports that event was felt</th>
                        <th>Oceanic region</th>
                        <th>Event ID</th>
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