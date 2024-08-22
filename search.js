// JavaScript: Integration of search functionality


// Search typing effect
const searchOptions = [
    "...",
    " by products...",
    " by service...",
    " by location...",
    " by keywords..."
];

const typingDelay = 50; // in milliseconds
const eraseDelay = 25; // in milliseconds
const pauseDelay = 800; // in milliseconds

const searchInput = document.getElementById('searchInput');

function displayTextWithTypingEffect() {
    let index = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const currentText = searchOptions[index];
        if (isDeleting) {
            text = currentText.substring(0, text.length - 1);
        } else {
            text = currentText.substring(0, text.length + 1);
        }

        searchInput.placeholder = "Search Pink businesses" + text;

        let typingSpeed = typingDelay;
        if (isDeleting) {
            typingSpeed /= 2;
        }

        if (!isDeleting && text === currentText) {
            isDeleting = true;
            typingSpeed = pauseDelay;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            index++;
            if (index === searchOptions.length) {
                searchInput.placeholder = "Search Pink businesses..."; // Display final text
                return; // Stop after displaying each option once
            }
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

displayTextWithTypingEffect();

// Function to handle search
function handleSearch() {
    // Get the search term
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    // Find the businesses in the data that match the search term
    const matchingBusinesses = data.filter(business => {
        return Object.values(business).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchTerm);
            }
            return false;
        });
    });

    // If businesses found, display markers for them on the map
    if (matchingBusinesses.length > 0) {
        // Clear existing markers
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Create an array to hold LatLng objects for each matching business
        const latLngs = [];

        // Add markers for the matching businesses and populate the latLngs array
        matchingBusinesses.forEach(business => {
            const lat = parseFloat(business["results._geolocation.1"]);
            const lng = parseFloat(business["results._geolocation.2"]);

            // Check if lat and lng are valid numbers
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                marker.bindPopup(createPopupContent(business), { maxWidth: 300 });
                latLngs.push([lat, lng]);
            }
        });

        // Create a LatLngBounds object from the latLngs array
        const bounds = L.latLngBounds(latLngs);

        // Fit the map to the bounds with a padding of 10 and set the zoom level to 10
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 17 });
    } else {
        // If no businesses found, show an alert
        alert("No businesses found");
    }
}


// Function to handle search button click
function searchButtonClick() {
    handleSearch();
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', searchButtonClick);

// Event listener for Enter key press in the search input field
document.getElementById('searchInput').addEventListener('keypress', handleKeyPress);



// Function to re-create popup content
function createPopupContent(item) {
    const businessName = item["results.Business_Name"];
    const productsServices = item["results.What_products_are_yo_r_services_you_offer"] || "";
    const others = item["results.Others_iba_pa"] || "";
    const address = item["results.Address"] || "";
    const contactNumber = item["results.Contact_number"] || "";
    const website = item["results.Website_or_Online_Shop_Link"] || "";
    const facebook = item["results.Facebook_Page_URL"] || "";
    const messenger = item["Facebook Messenger"] || "";
    const googleMaps = item["Google Maps"] || "";
    const waze = item["Waze"] || "";

    return `
        <h2 style='font-size: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);'>${businessName}</h2>
        ${productsServices ? `<b>Products or Services:</b> ${productsServices}<br>` : ""}
        ${others ? `<b>Others:</b> ${others}<br>` : ""}
        <b>Address:</b> ${address}<br>
        <b>Contact Number:</b> ${contactNumber}<br>
        <div class='button-container'>
            ${website ? `<div class='button' style='background-color: #4caf50;'><a href='${website}' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'><img src='https://i.ibb.co/pzS2tMV/icons8-website-50.png' alt='Website'><span class='tooltip'>Website</span></a></div>` : ""}
            ${facebook ? `<div class='button' style='background-color: #3b5998;'><a href='${facebook}' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'><img src='https://i.ibb.co/QYzfr5X/icons8-facebook-50.png' alt='Facebook'><span class='tooltip'>Facebook</span></a></div>` : ""}
            ${messenger ? `<div class='button' style='background-color: #0084ff;'><a href='${messenger}' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'><img src='https://i.ibb.co/T0s5JyK/icons8-messenger-50.png' alt='Messenger'><span class='tooltip'>Messenger</span></a></div>` : ""}
            ${googleMaps ? `<div class='button' style='background-color: #4285f4;'><a href='${googleMaps}' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'><img src='https://i.ibb.co/jk7dhy0/icons8-google-maps-50.png' alt='Google Maps'><span class='tooltip'>Google Maps</span></a></div>` : ""}
            ${waze ? `<div class='button' style='background-color: #ff9800;'><a href='${waze}' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'><img src='https://i.ibb.co/NWqQ2mT/icons8-waze-50.png' alt='Waze'><span class='tooltip'>Waze</span></a></div>` : ""}
        </div>
    `;
}


// Function to close the popup
function closePopup() {
    map.closePopup();
}
