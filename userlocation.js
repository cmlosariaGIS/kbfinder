function locateUser() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

                    // Remove previous marker if exists
                    if (typeof userMarker !== 'undefined') {
                        map.removeLayer(userMarker);
                    }

                    // Create a marker at the user's location
                    userMarker = L.marker(userLatLng, { icon: L.divIcon({ className: 'user-location-icon', html: '' }) }).addTo(map);
                    
                    // Pan the map to the user's location
                    map.setView(userLatLng, 15);
                }, function (error) {
                    alert("Error: " + error.message);
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }