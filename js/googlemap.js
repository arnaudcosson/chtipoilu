//<![CDATA[

	var map = null;
	var geocoder = null;
	var directions = null;
	var directionsPanel;
	var htmlInfos = "<h1 class=\"map\">Ch'ti poilu</h1>Salon de toilettage <br/>29 Rue Pierre Og&eacute;e<br/>59112 Annoeullin<br/>Tel : 03 20 86 73 00";
	var toAddress = "29 Rue Pierre Ogée 59112 Annoeullin, France";
	
    function load() {
      if (GBrowserIsCompatible())
      {
        var baseIcon = new GIcon();
 		baseIcon.iconSize=new GSize(32,32);
 		baseIcon.iconAnchor=new GPoint(16,16);
 		baseIcon.infoWindowAnchor=new GPoint(16,16);
 		
		map = new GMap2(document.getElementById("map"));
	    map.addControl(new GMapTypeControl());

      	//creation de l'objet pour l'itinéraire
      	directionsPanel = document.getElementById("itineraire");
  		directions = new GDirections(map,directionsPanel);
	  	
	  	//creation de l'objet pour l'encodage des adresses en longitude/latitude
    	geocoder = new GClientGeocoder();
    	geocoder.setBaseCountryCode("fr");
		geocoder.getLatLng(
			toAddress,
	    	function(point) {
	        	map.setCenter(point, 16);
				map.addControl(new GLargeMapControl());
				map.enableDoubleClickZoom();
				var marker = new GMarker(point,{title:"Plus d'infos"});
				map.addOverlay(marker);
				//map.setMapType(G_HYBRID_MAP);
				GEvent.addListener(marker, 'click', function() {
					marker.openInfoWindowHtml(htmlInfos);
				});
				marker.openInfoWindowHtml(htmlInfos);
	        }
		);
      }
    }
    
    //Fonction qui permet d'afficher l'itinéraire
    function itineraire(frm) {
    	//modification des type pour correspondre au type de google maps
    	var type = frm.elements['voiture'].checked ? G_TRAVEL_MODE_DRIVING : G_TRAVEL_MODE_WALKING ;
    	var fromAddress = frm.elements['adresse'].value;
    	
		directions.clear();
		directions.load("from: " + fromAddress +" to: " + toAddress ,{travelMode:type});
		map.closeInfoWindow(); 
    }
//]]>