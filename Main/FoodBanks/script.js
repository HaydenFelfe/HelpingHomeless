// Function to initialize the map
function initMap() {
    // Get the user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(success, error);
  }
  
  // Success callback function for Geolocation API
  function success(position) {
    const userLatLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  
    // Create a map centered at the user's location
    const map = new google.maps.Map(document.getElementById("map"), {
      center: userLatLng,
      zoom: 12
    });
  
    // Add a marker for the user's location
    const userMarker = new google.maps.Marker({
      position: userLatLng,
      map: map,
      title: "Your Location"
    });
  
    // Fetch food bank locations from the API
    fetchFoodBankLocations().then(foodBanks => {
      // Create markers for food bank locations
      foodBanks.forEach(foodBank => {
        const marker = new google.maps.Marker({
          position: {
            lat: foodBank.lat,
            lng: foodBank.lng
          },
          map: map,
          title: foodBank.name
        });
  
        // Add click event listener to display directions
        marker.addListener("click", () => {
          calculateAndDisplayDirections(userLatLng, marker.getPosition());
        });
      });
    });
  }
  
  // Fetch food bank locations from the API
  function fetchFoodBankLocations() {
    // Perform the fetch request to the Food Banks API
    return fetch("YOUR_FOOD_BANKS_API_ENDPOINT")
      .then(response => response.json())
      .then(data => data.locations); // Adjust based on the structure of the API response
  }
  
  // Calculate and display directions from user's location to the selected food bank
  function calculateAndDisplayDirections(origin, destination) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
  
    directionsRenderer.setMap(map); // Set the map to display the directions
  
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  
  // Error callback function for Geolocation API
  function error() {
    alert("Error: The Geolocation service failed.");
  }
  