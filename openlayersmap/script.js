let map = new OpenLayers.Map("map");

map.addLayer( new OpenLayers.Layer.OSM() );

let myplace = new OpenLayers.LonLat( -122.7150764,38.4399091 ).transform(
  new OpenLayers.Projection("EPSG:4326"),
  map.getProjectionObject()
);

let myzoom=15;

map.setCenter( myplace, myzoom );

let markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

fetch('map.json')
  .then( myresponse => myresponse.json() )
  .then( mydata => {

    console.log(mydata);

    for ( let c=0; c < mydata.length; c++ ) {
      let myspot = new OpenLayers.LonLat( mydata[c].lng, mydata[c].lat ).transform(
          new OpenLayers.Projection("EPSG:4326"),
          map.getProjectionObject()
      );

      let mymarker = new OpenLayers.Marker(myspot);
        markers.addMarker(mymarker);

      let popup = new OpenLayers.Popup.FramedCloud(
        mydata[c].title,
        myspot,
        null,
        mydata[c].description,
        null,
        true
      );

    mymarker.events.register(
      "click",
      markers,
      function(){
        map.addPopup( popup );
      }
    );  
  }
})

.catch(
  (myerror) => console.error(myerror)
);

console.log("did this after fetch statement");