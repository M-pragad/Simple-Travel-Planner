const form = document.getElementById('flight-form');
const results = document.getElementById('results');

// Replace these with your actual Amadeus credentials
const clientId = 'YOUR CLIENT ID';
const clientSecret = 'YOUR CLIENT SECRET';

async function getToken() {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    })
  });
  const data = await response.json();
  return data.access_token;
}

async function searchFlights(token, from, to, date) {
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&max=5&currencyCode=INR`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Flight search failed');
  }

  const data = await response.json();
  return data.data;
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  results.innerHTML = '<li>Loading...</li>';

  const from = document.getElementById('from').value.trim().toUpperCase();
  const to = document.getElementById('to').value.trim().toUpperCase();
  const date = document.getElementById('departure-date').value;

  try {
    const token = await getToken();
    const flights = await searchFlights(token, from, to, date);

    results.innerHTML = '';
    if (flights.length === 0) {
      results.innerHTML = '<li>No flights found</li>';
    } else {
      flights.forEach(flight => {
        const itinerary = flight.itineraries[0];
        const segments = itinerary.segments;
        const price = flight.price.total;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${segments[0].departure.iataCode}</strong><p>to</p><strong>${segments[segments.length - 1].arrival.iataCode}</strong><br>
          Departure: ${segments[0].departure.at}<br>
          Price: <p>&#x20B9 ${Math.trunc(price)}</p>
        `;
        results.appendChild(listItem);
      });
    }
  } catch (err) {
    console.error(err);
    results.innerHTML = '<li>Error fetching flights.</li>';
  }
});
function indexpage(){
  window.location.href = "index.html";
}