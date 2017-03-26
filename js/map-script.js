	
	'use strict';	
	
	// CHECK WINDOW RESIZE
	var is_windowresize = false;
	$(window).resize(function(){
		is_windowresize = true;
	});
	
	
	//INITIALIZE MAP
	function initialize() {
		
		//DEFINE MAP OPTIONS
		//=======================================================================================
  		var mapOptions = {
    		zoom: 13,		
			mapTypeId: google.maps.MapTypeId.ROADMAP,	
    		center: new google.maps.LatLng(52.446844, 1.621095),
			panControl: true,
  			zoomControl: true,
  			mapTypeControl: true,
  			//scaleControl: false,
  			streetViewControl: true,
  			overviewMapControl: true,
            scrollwheel:  false,
			//rotateControl:true,
            styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
			
  		};

		//CREATE NEW MAP
		//=======================================================================================
  		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		//MARKER ICON
		//=======================================================================================
		//var image = 'facebook30.svg';
		
		//ADD NEW MARKER
		//=======================================================================================
  		/*var marker = new google.maps.Marker({
    		position: map.getCenter(),
   		 	map: map,
    		title: 'Click to zoom',
			icon: image
  		});
		
		var marker1 = new google.maps.Marker({
    		position: new google.maps.LatLng(-12.042559, -77.027426),
   		 	map: map,
    		title: 'Click to zoom'
  		});*/
		
		
		//ADD NEW MARKER WITH LABEL
		//=======================================================================================
		var weddingMarker = new MarkerWithLabel({
       		position: new google.maps.LatLng(52.446844, 1.621095),
       		draggable: false,
       		raiseOnDrag: false,
       		icon: ' ',
       		map: map, 
         	labelContent: '<div class="de-icon circle medium-size" style="background-color:#FFF; border:1px solid #4f73b1"><i class="ion-ios-bell" style="color:#4f73b1"></i></div>',
       		labelAnchor: new google.maps.Point(29, 20),
       		labelClass: "labels" // the CSS class for the label
     		});
    
		var receptionMarker = new MarkerWithLabel({
       		position: new google.maps.LatLng(52.489707, 1.582605),
       		draggable: false,
       		raiseOnDrag: false,
       		icon: ' ',
       		map: map, 
         	labelContent: '<div class="de-icon circle small-size" style="background-color:#6a6a6a"><i class="ion-wineglass"></i></div>',
       		labelAnchor: new google.maps.Point(0, 0),
       		labelClass: "labels" // the CSS class for the label
     		});
			
			
    	//marker.setMap( map );
		
		
		//INFO WINDOWS
		//=======================================================================================
		var contentString = '<div>'+
		'WEDDING CEREMONY <br/>'+
        '<a href="http://maps.google.com/maps?saddr='+weddingMarker.position.lat()+','+weddingMarker.position.lng()+'" target="_blank">Open google maps</a>'
      	'</div>';
		
		var contentString1 = '<div>'+
		'WEDDING RECEPTION <br/>'+
        '<a href="http://maps.google.com/maps?saddr='+receptionMarker.position.lat()+','+receptionMarker.position.lng()+'" target="_blank">Open google maps</a>'
      	'</div>';

 	 	var infowindow = new google.maps.InfoWindow({
      		content: contentString,
            pixelOffset: new google.maps.Size(0,10)
  		});
		
		var infowindow1 = new google.maps.InfoWindow({
      		content: contentString1,
            pixelOffset: new google.maps.Size(20,30)
  		});
		
		
		
		//OPEN INFO WINDOWS ON LOAD
		//=======================================================================================
  		infowindow.open(map,weddingMarker);
        infowindow1.open(map,receptionMarker);
		
		//ON BOUND EVENTS AND WINDOW RESIZE
		//=======================================================================================
		google.maps.event.addListener(map, 'bounds_changed', function() {  		
			if (is_windowresize)
			{
				//map.setCenter(marker.getPosition());
				window.setTimeout(function() {
      				map.panTo(weddingMarker.getPosition());
    			}, 500);
			}
			is_windowresize=false;
		});
        
        document.getElementById('mapCeremony').onmouseover = function(){
            $('#mapCeremony').addClass('hover');
            $('#mapReception').removeClass('hover');
            map.panTo(weddingMarker.getPosition());
        };
        
        document.getElementById('mapReception').onmouseover = function(){
            $('#mapReception').addClass('hover');
            $('#mapCeremony').removeClass('hover');
            map.panTo(receptionMarker.getPosition());
        };
	}

	// LOAD GMAP
	google.maps.event.addDomListener(window, 'load', initialize);
	
	
