// initialize the map
var map = L.map('map').setView([20.5937, 78.9629], 13);

var incidents=[]
var flow=[]
//user location variables
var initLat;
var initLong;
// load a tile layer
function getPopup(details){
  var container = L.DomUtil.create('div','customDiv')
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
  function getPopup2(details,description){
    var container = L.DomUtil.create('div','customDiv')
        var flipC=this.createDiv('', container, "flipCard")
        var flipCard=this.createDiv('', flipC, "flipCardInner")
          var flipCardFront=this.createDiv('', flipCard, "flipCardFront")
            var  text1 = this.createDiv("description"+description, flipCardFront, "customDiv1")
            var  text2 = this.createDiv("confidence"+details.confidence, flipCardFront, "customDiv2") 
            var  text3 = this.createDiv("length"+details.length, flipCardFront, "customDiv2") 
           var flipCardBack=this.createDiv('', flipCard, "flipCardBack")
            var  text2 = this.createDiv("jamFactor"+details.jamFactor, flipCardBack, "customDiv3") 
            var  text1 = this.createDiv("freeflow"+details.freeFlow, flipCardBack, "customDiv1")
        
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
  var customOptions =
  {
  'maxWidth': '400',
  'width': '200',
  'className' : 'popupCustom'
  }
  var drawPoints=[]
  var incidentDetails=[]
  //populate all the features
  incidents.forEach(incident=>{
  incident.location.shape.links.forEach(link=>{
    incidentDetails.push(incident.incidentDetails)
    drawPoints.push(link.points)
    })
  })
  drawPoints.forEach((road,index)=>{
    var roadCoords=[]
    road.forEach(coords=>{
      roadCoords.push([coords.lat,coords.lng])
    })
    var customPopup = "<b>My office</b><br/><img src='http://netdna.webdesignerdepot.com/uploads/2014/05/workspace_06_previo.jpg' alt='maptime logo gif' width='150px'/>";
    // specify popup options 
   
        if (incidentDetails[index].type == "accident")
        L.polyline(roadCoords, {color: 'red'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
        else if(incidentDetails[index].roadClosed)
        L.polyline(roadCoords, {color: 'black'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
      else if(incidentDetails[index].criticality== "minor")
        L.polyline(roadCoords, {color: 'orange'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
   else 
      L.polyline(roadCoords, {color: 'purple'}).addTo(map).bindPopup(getPopup(incidentDetails[index]),customOptions);
    })
var flowData=[]
var flowPoints=[]
locations=[]
flow.forEach(flowUnit=>{
  var temp=[]
  flowData.push(flowUnit.currentFlow)
  locations.push(flowUnit.location.description)
  flowUnit.location.shape.links.forEach(link=>{
    // flowData.push(incident.incidentDetails)
   temp=[...link.points]
    })
    flowPoints.push(temp)
  })
console.log(flowData.length)
console.log(flowPoints.length)

  flowPoints.forEach((road,index)=>{
    var roadCoords=[]
    road.forEach(coords=>{
      roadCoords.push([coords.lat,coords.lng])
    })
    var line=L.polyline(roadCoords, {color: 'green'}).addTo(map).bindPopup(getPopup2(flowData[index],locations[index]),customOptions)
  })

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

 
var streets

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
  
  const initcords = await getIncidents(coords.lat,coords.long)
  console.log(initcords)
  map.setView(new L.LatLng(coords.lat, coords.long), 13);
  let userMarker = L.marker([coords.lat, coords.long]).addTo(map);
  

  var colored = L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    }
  );
  streets=L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=agLQ82PjypipwzXJBUWV',
    {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
     
    }).addTo(map);
  googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
  });
  var baseMaps = {
    "Colored": colored,
    "satellite": googleSat,
    "streets": streets
  };
  
  var overlayMaps={}
  var layerCOntrol=L.control.layers(baseMaps, overlayMaps,{ position: 'bottomright' }).addTo(map);

}
async function getFlow(lat,lng){
  let response = await axios.get("https://data.traffic.hereapi.com/v7/flow?apiKey=Fy7bI6cEAp4BGKJ7QaPh6_kAOzVBQSTWCO303al7SB4&in=circle:"+lat+","+lng+";r=5000&locationReferencing=shape")
  return response.data.results;
}


  async function getIncidents(lat,lng){
    let response = await axios.get("https://data.traffic.hereapi.com/v7/incidents?in=circle:"+lat+","+lng+";r=50000&locationReferencing=shape&apikey=Fy7bI6cEAp4BGKJ7QaPh6_kAOzVBQSTWCO303al7SB4")
    return response.data.results;
  }

map.on('click', async function(e) {
   incidents=await getIncidents(e.latlng.lat,e.latlng.lng)
   flow=await getFlow(e.latlng.lat,e.latlng.lng)
   temp()
}); 

   L.Routing.control({
  waypoints: [
      L.latLng(15.41, 73.97),
      L.latLng( 18.5204, 73.8567)
  ],
  routeWhileDragging: true,
  showAlternatives: true,
  lineOptions: {
     styles: [{
    color:'blue',
    opacity: 1,
    weight: 2,
    className: 'animate'
  }]},
  collapsible:true
}).addTo(map);

control.on('routesfound', function(e) {
  var coord = e.route.coordinates;
  var instr = e.route.instructions;
 // L.geoJson(getInstrGeoJson(instr,coord)).addTo(map);
 console.log(coord+"this is it")
});