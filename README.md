# Team-zero
<img src="https://cdn0.iconfinder.com/data/icons/construction-tool-16/128/Traffic-cone-caution-safety-road-512.png" align="left"
     alt="Sroad safety" width="60" height="60">
Road accidents are a regular source of concern for public safety, especially in our state during the upcoming season. Accident risk can be mitigated by driving carefully in accident-prone zones. Devise a solution to map out the accident-prone zones based on government released data.
<br>

<p align="center">
  <img src="https://c.tenor.com/LNXHufgzGAwAAAAM/kermit-the-frog-drive.gif" alt="Size Limit CLI" width="738">
</p>

## How It Works

1. We are getting the JSON dataset from third party API providers.
2. All the data is fetched from "here" provider traffic api.
3. For presenting the data and for user interaction all the functionalities are coded entirely on geographical map interface.
4. We are using leaflet library to present the data.
5. we are providing 3 tilelayers for better visibilty and user convenience.
6. For generating the route leaflet routing machine is utilised
7. An optimised route along with possible alternate routes are created as the user drags the markers representing his/her source and destination
8. Coordinates of the obstruction within 100M of route's coordinates are flagged using haversine formula and a call to google api will provide the street name
9. Leaflet routing machine also provides a iternery for better UX

## Future Scope
1. Add voice instructions based on iternary
2. re route the path away from obstructions
3. Add weather related obstructions
4. Index traffic signs
5. Alert of the upcoming flagged streetname

# Here API call
```
 async function getIncidents(lat,lng){
    let response = await axios.get("https://data.traffic.hereapi.com/v7/incidents?in=circle:"+lat+","+lng+";r=50000&locationReferencing=shape&apikey=Fy7bI6cEAp4BGKJ7QaPh6_kAOzVBQSTWCO303al7SB4")
    return response.data.results;
  }
```
