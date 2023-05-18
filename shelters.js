function searchHomelessShelters(latitude, longitude) {
    const radius = 5000; 
    const keyword = 'homeless shelters';
    const apiKey = GAPI_KEY;
    console.log(longitude);
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=4000&type=shelter&keyword=homeless&key=${apiKey}`
    console.log(apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
    var sheltersArray = []
    for(var i=0; i<data.results.length; i++){
    const shelterName = data.results[i].name;
    const shelterVicinity = data.results[i].vicinity;
    const shelterLat = data.results[i].geometry.location.lat;
    const shelterLon = data.results[i].geometry.location.lng;

    sheltersArray.push({shelterName, shelterVicinity, shelterLat, shelterLon})
    
    }
       console.log(sheltersArray);
  
       
          const shelterListElement = document.getElementById('shelter-list');
          sheltersArray.forEach(shelter => {
            console.log(shelter.shelterName)
            const shelterItem = document.createElement('li');
            const shelterListen = document.createElement('p');
            shelterItem.textContent = shelter.shelterName;
            shelterListen.textContent = shelter.shelterVicinity;
            shelterItem.append(shelterListen);
            shelterListElement.appendChild(shelterItem);
          });
          shelterListElement.style.border="3px solid black";
          const mapElement = document.getElementById('map');
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 12
          };
          const map = new google.maps.Map(mapElement, mapOptions);
          const infowindow = new google.maps.InfoWindow()
          sheltersArray.forEach(shelter => {
            const marker = new google.maps.Marker({
              position: { lat: shelter.shelterLat, lng: shelter.shelterLon},
              map: map,
              title: shelter.shelterName
            });
            marker.addListener('click', function() {

            infowindow.setContent(
                `<div>${shelter.shelterName}</div> <div>${shelter.shelterVicinity}</div>`
            );
            infowindow.open(map,marker);
            
            
           
            });
          });
      })
      .catch(error => {
        console.error('Error fetching shelter data:', error);
      });
  }
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("lat: ", latitude);
        console.log("lon: ", longitude);
  
        searchHomelessShelters(latitude, longitude);
      },
      function(error) {
        console.error('Error retrieving user location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported');
  }