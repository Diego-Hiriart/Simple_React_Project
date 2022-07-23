# Web Engineering React Project
This React app was developed as an assignment for the Web Engineering course. For this project, two activities were particularly challenging: styling the page so that it looks slightly better than on previous projects, and adding validations to the search filter form. Both of these challenges were successfully overcome, but my ability with styling could still improve. When it comes to the validations, some research was required into how this can be accomplished with JavaScript and React. Essentially, the inputs to be validated had to be stored in variables after getting them from the document by their ID, after that, listeners were added which showed the custom validations if the values were inadequate. A useEffect hook is used for all this process of getting the input fields and adding the listeners (the effect), with an empty dependency list so that the effect takes place once the component mounts (otherwise errors occur because the elements don't exist).

# Installing and running the React app locally
First of all, make sure you have installed Node in your computer, this will allow you to run the commands you need. Then, once you have downloaded the code, open the folder in Visual Studio Code and open a terminal, run this command in it:
```
npm install
```
That will install all the necessary dependencies (packages) needed for the React app. When the installation has completed, you can run the app with:
```
npm start
```
With that command, you will start up a development server, which will not only locally start the app in the designated port but will also reload the app whenever you save changes without needing to restart the server.\
Since This React app uses an API make sure you can stablish a connection to the [USGS Earthquake Catalog API](https://earthquake.usgs.gov/fdsnws/event/1/)

# Functionality
This web page allows the user to search for geological events that have taken place in an area determined by a radius around specific coordinates, the start and end time, as well as maximum and minimum magnitude, can also be specified. By default, the app searches for events that have taken place in the last 30 days, in a radius of 1200 km around the coordinates (-1.7, -83), which are latitude and longitude. This area corresponds to Ecuador and the Galápagos islands. To use the filtering functionality, the user must input the following data:
  - Latitude and longitude (coordinates that act as the center of the area to be searched)
  - Radus in km (cannot be over 20001.6)
  - Minimum and maximum magnitude of the geological events (both must the in the range of 0 to 10, excluding the upper limit, due to geological impossibility)
  - Start and end dates to look for events
If needed, the filter can be cleared and the default data will be showed.\
The following information is showed for each event:
  - Type of event
  - Location: plain text location
  - Latitude
  - Longitude
  - Depth (km)
  - Magnitude
  - Magnitude type: the method used to calculate the event's magnitude
  - Date and Time UTC
  - Reports that event was felt: reports submitted that people felt the event
  - Oceanic region: indicates if the event took place in an oceanic region (does not confirm or deny a tsunami)
  - Event ID: the ID that event has in the USGS

# Useful resources / Documentation
  - [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) and [Hooks API Reference - useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) (used to check if the page mounted so that listeners can be applied for the form)
  - [Components and Props](https://reactjs.org/docs/components-and-props.html) (for the ReadRowResults functional component)
  - [Fragments - React](https://reactjs.org/docs/fragments.html) (lets you render components in a DOM)
  - [API Documentation - Earthquake Catalog](https://earthquake.usgs.gov/fdsnws/event/1/)
  - [GeoJSON Detail Format](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson_detail.php) (information about the data which is used in the app and the API handles)

# Contact
[hiriart.leon.d@gmail.com](mailto:hiriart.leon.d@gmail.com)