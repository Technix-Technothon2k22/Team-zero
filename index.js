// initialize the map
var map = L.map('map').setView([20.5937, 78.9629], 13);
var incidents=[]
var initIncidents=[]
//user location variables
var initLat;
var initLong;
// load a tile layer
function getPopup(details){
  var container = L.DomUtil.create('div','customDiv')
      var img= this.createDiv('level 4',container,"customDivImg")
      var flipC=this.createDiv('', container, "flipCard")
      var flipCard=this.createDiv('', flipC, "flipCardInner")
        var flipCardFront=this.createDiv('', flipCard, "flipCardFront")
          var  text1 = this.createDiv(details.criticality, flipCardFront, "customDiv1")
          var  text2 = this.createDiv(details.type, flipCardFront, "customDiv2") 
          var  text2 = this.createDiv(details.roadClosed, flipCardFront, "customDiv3") 
         var flipCardBack=this.createDiv('', flipCard, "flipCardBack")
          var  text2 = this.createDiv(details.description.value, flipCardBack, "customDiv3") 
          var  text1 = this.createDiv('', flipCardBack, "customDiv1")
          var  text2 = this.createDiv('', flipCardBack, "customDiv2") 
      
          var  cards = this.createDiv('', container, "cardsBottom")
          var card1= this.createDiv('', cards, "onethird")
            var text3= this.createDiv('details.', card1, "stat")
            var text4= this.createDiv('Training', card1, "stat-value")
  
          var card2= this.createDiv('', cards, "onethird")
            var text5= this.createDiv('16', card2, "stat")
            var text6= this.createDiv('Speed', card2, "stat-value")
  
          var card3= this.createDiv('', cards, "lastElement")
            var text7= this.createDiv('150', card3, "stat")
            var text8= this.createDiv('Cost', card3, "stat-value")
  
  return container
  }
   function createButton (label, container, className) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        btn.className = className
        return btn;
      }
      function createIcon (label, container, className) {
        var btn = L.DomUtil.create('i', '', container);
        // btn.setAttribute('type', '');
        btn.innerHTML = label;
        btn.className = className
        return btn;
      }
      function createInputUsername (label, container, className) {
        var btn = L.DomUtil.create('input', '', container);
        btn.setAttribute('type', 'username');
        btn.innerHTML = label;
        btn.className = className
        return btn;
      }
       function createInputPassword (label, container, className) {
        var btn = L.DomUtil.create('input', '', container);
        btn.setAttribute('type', 'password');
        btn.innerHTML = label;
        btn.className = className
        return btn;
      }
      function createDiv(label, container, className){
        var div = L.DomUtil.create('div',className, container);
             div.setAttribute('type', 'div');
             div.innerHTML = label;
             
             return div;
       }

//show current user location
function locateUser  () {
    //map.locate({setView: true, maxZoom: 16});
    
// Show a market at the position of the Eiffel Tower
// let eiffelMarker = L.marker([48.8584, 2.2945]).addTo(map);
 
// // Bind popup to the marker with a popup
// eiffelMarker.bindPopup("Eiffel Tower").openPopup();
};
function displayPoints(){
  
}
function temp(){
  var drawPoints=[]
  var incidentDetails=[]
  //populate all the features
  incidents.forEach(incident=>{
  incident.location.shape.links.forEach(link=>{
    incidentDetails.push(incident.incidentDetails)
    drawPoints.push(link.points)
    })
  })
  // console.log(incidentDetails.length)
  // console.log(drawPoints.length)

  // console.log(JSON.stringify(drawPoints))
  drawPoints.forEach((road,index)=>{
    var roadCoords=[]
    road.forEach(coords=>{
      roadCoords.push([coords.lat,coords.lng])
    })
    var customPopup = "<b>My office</b><br/><img src='http://netdna.webdesignerdepot.com/uploads/2014/05/workspace_06_previo.jpg' alt='maptime logo gif' width='150px'/>";
    // specify popup options 
    var customOptions =
        {
        'maxWidth': '400',
        'width': '200',
        'className' : 'popupCustom'
        }
      if(incidentDetails[index].criticality== "minor")
        L.polyline(roadCoords, {color: 'orange'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
      else
      L.polyline(roadCoords, {color: 'red'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
  })

// map.fitBounds(polyline.getBounds())
}

// function getLocation() {
//      if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//        console.log("Geolocation is not supported by this browser.");
//     }
//   }
  
//   function showPosition(position) {
//     console.log(position.coords.latitude + " " +position.coords.longitude);
//      initLat = position.coords.latitude;
//      initLong = position.coords.longitude
//     //map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
//     map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 13);
//     let userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
//   }


window.onload = async () => {
  const getCoords = async () => {
    const pos = await new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(resolve,reject);
    });
    return {
      long: pos.coords.longitude,
      lat:  pos.coords.latitude
    };
  };
  const coords = await getCoords();
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=agLQ82PjypipwzXJBUWV',
  {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
   
  }).addTo(map);
  const initcords = await getIncidents(coords.lat,coords.long)
  console.log(initcords)
  map.setView(new L.LatLng(coords.lat, coords.long), 13);
  let userMarker = L.marker([coords.lat, coords.long]).addTo(map);

}



  async function getIncidents(lat,lng){
    let response = await axios.get("https://data.traffic.hereapi.com/v7/incidents?in=circle:"+lat+","+lng+";r=50000&locationReferencing=shape&apikey=Fy7bI6cEAp4BGKJ7QaPh6_kAOzVBQSTWCO303al7SB4")
    return response.data.results;
  }

map.on('click', async function(e) {
   incidents=await getIncidents(e.latlng.lat,e.latlng.lng)
   temp()
   
});

L.Routing.control({
  waypoints: [
      L.latLng(15.267625485271353, 73.95961761474608),
      L.latLng( 15.245102293646266, 15.245102293646266)
  ],
  routeWhileDragging: true,
  showAlternatives: true,
  lineOptions: {
     styles: [{
    color:'blue',
    opacity: 1,
    weight: 2
  }]},
  collapsible:true
}).addTo(map);
L.Routing.itinerary({
  
})
