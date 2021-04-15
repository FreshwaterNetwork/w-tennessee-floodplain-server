// create map and layers for app
require([
   "esri/Map",
   "esri/views/MapView",
   "esri/widgets/BasemapGallery",
   "esri/widgets/Expand",
   "esri/widgets/BasemapGallery/support/PortalBasemapsSource",
   "esri/widgets/Search",
   "esri/widgets/Legend",
   "esri/layers/FeatureLayer", 
   "esri/layers/MapImageLayer",
   "esri/PopupTemplate",
   "esri/tasks/QueryTask", 
   "esri/tasks/support/Query",
   "esri/layers/GraphicsLayer"],
function(
   Map,
   MapView,
   BasemapGallery,
   Expand,
   PortalSource,
   Search,
   Legend,
   FeatureLayer,
   MapImageLayer,
   PopupTemplate, 
   QueryTask,
   Query,
   GraphicsLayer) {
   
   // create map
   app.map = new Map({
      basemap: "topo"
   });

   //create map view
   app.view = new MapView({
      container: "viewDiv",
      center: [-168, 46],
      zoom: 3,
      map: app.map,
      // add popup window to map view for map clicks
      popup: {
         collapseEnabled: false,
         dockEnabled: true,
         dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
            position: "top-left"
         }
      }
   });

   //create basemap widget
   const allowedBasemapTitles = ["Topographic", "Imagery Hybrid", "Streets"];
   const source = new PortalSource({
      // filtering portal basemaps
      filterFunction: (basemap) => allowedBasemapTitles.indexOf(basemap.portalItem.title) > -1
   });
   var basemapGallery = new BasemapGallery({
      view: app.view,
      source: source,
      container: document.createElement("div")
   });
   var bgExpand = new Expand({
      view: app.view,
      content: basemapGallery
   });
   app.view.ui.add(bgExpand, {
      position: "top-right"
   });
   // close expand when basemap is changed
   app.map.watch('basemap.title', function(newValue, oldValue, property, object){
      bgExpand.collapse();
   });

   //create search widget
   const searchWidget = new Search({
      view: app.view,
      locationEnabled: false,
      container: document.createElement("div")
   });
   var srExpand = new Expand({
      view: app.view,
      content: searchWidget
   })
   app.view.ui.add(srExpand, {
      position: "top-right"
   })

   // move zoom controls to top right
   app.view.ui.move([ "zoom" ], "top-right");
   
   // create map layers - the source can be a map service or an AGO web map - sublayers are defined in variables.js
   app.layers = new MapImageLayer({
      url: "https://cirrus.tnc.org/arcgis/rest/services/FN_AGR/WesternTennessee/MapServer", 
      sublayers: app.mapImageLayers
   })
   // graphics layer for map click graphics
   app.resultsLayer = new GraphicsLayer();
   // add layers to map
   app.map.add(app.layers)
   app.map.add(app.resultsLayer)

   // set layer visibility
   // var layer = app.layers.findSublayerById(parseInt(app.obj.hucLayer));
   // layer.visible = true;

   // create legend
   var legend = new Legend({
      view: app.view,
      layerInfos:[{
         layer: app.layers,
         title: "Legend"
      }],
      container: document.createElement("div")
   })
   var lgExpand = new Expand({
      view: app.view,
      content: legend
   })
   app.view.ui.add(lgExpand,{
      position: "bottom-left"
   })
   lgExpand.expand();

   // call event listener for map clicks
   mapClick();

   // trigger button clicks on startup
   document.querySelectorAll("#top-controls input[name='huc']").forEach(input => {
      if (input.value == app.obj.hucLayer){
         input.click();
      }
   })
   document.querySelectorAll("#top-controls input[name='floodFreq']").forEach(input => {
      if (input.value == app.obj.floodFreq){
         input.click();
      }
   })

   // trigger control clicks from app.obj
   buildFromState();
});

function clearGraphics(){
   app.map.layers.removeAll();
}

