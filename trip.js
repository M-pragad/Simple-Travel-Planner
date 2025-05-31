const form = document.getElementById('trip-form');
const tripList = document.getElementById('trip-list');
const destinationInput = document.getElementById('destination');

var a=0;
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const destination = destinationInput.value;
  const date = document.getElementById('date').value;
  const note = document.getElementById('note').value;
  function anum(){
    a=++a;
    return a;
    
  }

  const listItem = document.createElement('li');
  listItem.innerHTML = `<strong>${anum()}<p></p><strong>${destination}</strong> - ${date}<br><em>${note}</em>`;
  tripList.appendChild(listItem);

  form.reset();
});

const map = L.map('map').setView([28.6139, 77.2090], 13); // New Delhi

// Load Carto basemap (more stable than default OSM)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors & CartoDB'
}).addTo(map);

let marker;

// Click to select location
map.on('click', async function (e) {
  const { lat, lng } = e.latlng;

  // Move or create marker
  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map) ;
  }

  // Reverse geocoding with Nominatim (OpenStreetMap)
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const place = data.address.city || data.address.town || data.address.village || data.display_name;
    destinationInput.value = place;
  } catch (err) {
    destinationInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  }
});
map.locate({ setView: true, maxZoom: 16 });
map.on('locationfound', (e) => {
  L.marker(e.latlng).addTo(map).bindPopup('You are here').openPopup();
});
marker.bindPopup("<b>Paris</b><br><img src='eiffel.jpg' width='100'>");

function gotoflight(){
  window.location.href = "booking.html";
}
function weatherindex(){
  window.location.href = "weather.html";
}
