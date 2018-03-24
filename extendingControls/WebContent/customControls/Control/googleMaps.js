jQuery.sap.declare("customControls.Control.googleMaps");
sap.ui.core.Control.extend("customControls.Control.googleMaps", {          
            metadata : {
                properties : {           
					address : "string",
					lat:"string",
					long:"string",
					visible:"boolean"
                }
            },
            init: function(){
            	debugger;
                this._html = new sap.ui.core.HTML({content:"<div style='height:100%;width:100%;' id='" + this.getId()+"-map'></div>"});
            },
            renderer : function(oRm, oControl) {
            	debugger;
                oRm.write("<div style='height:440px;width:75%;margin:20px;' "); 
                oRm.writeControlData(oControl);  
                oRm.write(">");
                oRm.renderControl(oControl._html);
                oRm.write("</div>");
            },
            onAfterRendering : function() {   
            	debugger;
                    var options = {
                    		  zoom:2,
                    		 center: new google.maps.LatLng(32.88,13.180161)
                    		  };
                    var _map = new google.maps.Map(jQuery.sap.domById(this.getId()+"-map"),options);
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode( { 'address': this.getAddress()}, function(results, status) {
						 
						if (status == google.maps.GeocoderStatus.OK) {
							var triangleCoords = [
							                        new google.maps.LatLng(60.47202399999999,8.46894599999996), // Norway
							                        new google.maps.LatLng(23.634501,-102.55278399999997), //Mexico
							                        new google.maps.LatLng(37.09024,-95.71289100000001) //USA
							                      ];
							 var len= triangleCoords.length;
							for(var i=0;i<len;i++){
							 var marker = new google.maps.Marker({
									  map: _map,
									   icon: "images/pinkball.png",
//									  position: results[i].geometry.location
									  position: triangleCoords[i]
								 });
							 }
							 bermudaTriangle = new google.maps.Polygon({
								    paths: triangleCoords,
								    strokeColor: '#FF0000',
								    strokeOpacity: 0.8,
								    strokeWeight: 2,
								    fillColor: '#FF9999',
								    fillOpacity: 0.35
								  });
							  bermudaTriangle.setMap(_map);
						} else {
							  console.log('Geocode was not successful for the following reason: ' + status);
						}
						  });
            }
        });  
