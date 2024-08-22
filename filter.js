// Function to toggle slide menu
function toggleSlideMenu() {
    const slideMenu = document.getElementById("slideMenu");
    slideMenu.classList.toggle("active");
}


// Function to get selected categories
function getSelectedCategories() {
    var selectedCategories = [];
    $('input[name="category"]:checked').each(function () {
        selectedCategories.push($(this).val());
    });
    return selectedCategories;
}

// Function to clear category selection
function clearCategorySelection() {
    $('input[name="category"]').prop('checked', false);
}


/*Checkbox related functions*/
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

function toggleOptions(optionsId, iconClass) {
    var options = document.getElementById(optionsId);
    var icon = document.querySelector(iconClass);

    if (options.style.maxHeight === "0px") {
        options.style.maxHeight = options.scrollHeight + "px";
        icon.textContent = "chevron_right";
    } else {
        options.style.maxHeight = "0px";
        icon.textContent = "expand_more";
    }
}

function toggleCheckboxValue(checkboxValue, relatedCheckboxes) {
    var mainCheckbox = document.querySelector("input[value='" + checkboxValue + "']");
    var checked = true;

    relatedCheckboxes.forEach(function (value) {
        var checkbox = document.querySelector("input[value='" + value + "']");
        if (!checkbox.checked) {
            checked = false;
        }
    });

    mainCheckbox.checked = checked;
}

function toggleOptionsCheckboxes(mainCheckboxValue, relatedCheckboxes) {
    var mainCheckbox = document.querySelector("input[value='" + mainCheckboxValue + "']");
    var checked = mainCheckbox.checked;

    relatedCheckboxes.forEach(function (value) {
        var checkbox = document.querySelector("input[value='" + value + "']");
        checkbox.checked = checked;
    });
}

function toggleGISCheckbox() {
    toggleCheckboxValue('GIS', ['Cartography','Spatial Analysis', 'Spatial Data Extraction', 'Web GIS App Development']);
}

function toggleGISOptions() {
    toggleOptionsCheckboxes('GIS', ['Cartography','Spatial Analysis', 'Spatial Data Extraction', 'Web GIS App Development']);
}


function togglePlanningCheckbox() {
    toggleCheckboxValue('Planning', ['Business Park/High-tech Park/Industrial Park Planning','Infrastructure Planning/Design', 'Regional and Provincial Planning', 'Urban Planning']);
}

function togglePlanningOptions() {
    toggleOptionsCheckboxes('Planning', ['Business Park/High-tech Park/Industrial Park Planning','Infrastructure Planning/Design', 'Regional and Provincial Planning', 'Urban Planning']);
}

function toggleWaterManagementCheckbox() {
    toggleCheckboxValue('Water Management', ['Coastal Resource Management', 'River and Lakes Management', 'Flood Prevention']);
}

function toggleWaterManagementOptions() {
    toggleOptionsCheckboxes('Water Management', ['Coastal Resource Management', 'River and Lakes Management', 'Flood Prevention']);
}




/*** RESET FILTERS BUTTON **/

/// Function to display initial points on the map on Reset Button click
function displayInitialPoints() {
    data.forEach(function (item) {
        const lat = parseFloat(item["results._geolocation.1"]);
        const lng = parseFloat(item["results._geolocation.2"]);

        // Check if lat and lng are valid numbers
        if (!isNaN(lat) && !isNaN(lng)) {
            // Construct popup content with all fields (except Submission Time)
            let popupContent = "<h2 style='font-size: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);'>" + item["results.Business_Name"] + "</h2>";

            if (item["results.What_products_are_yo_r_services_you_offer"]) {
                popupContent += "<b>Products or Services:</b> " + item["results.What_products_are_yo_r_services_you_offer"] + "<br>";
            }

            if (item["results.Others_iba_pa"]) {
                popupContent += "<b>Others:</b> " + item["results.Others_iba_pa"] + "<br>";
            }

            popupContent += "<b>Address:</b> " + item["results.Address"] + "<br>" +
                "<b>Contact Number:</b> " + item["results.Contact_number"] + "<br>" +
                "<div class='button-container'>"; // Start of buttons container

            // Adding buttons with icons only
            const buttons = [
                {
                    icon: "<img src='https://i.ibb.co/T2rDZmc/icons8-phone-50.png' alt='Phone'>",
                    url: "tel:" + item["results.Contact_number"],
                    color: "#4caf50", // phone green
                    tooltip: "Phone"
                },
                {
                    icon: "<img src='https://i.ibb.co/pzS2tMV/icons8-website-50.png' alt='Website'>",
                    url: item["results.Website_or_Online_Shop_Link"],
                    color: "#4caf50", // Website green
                    tooltip: "Website"
                },
                {
                    icon: "<img src='https://i.ibb.co/QYzfr5X/icons8-facebook-50.png' alt='Facebook'>",
                    url: item["results.Facebook_Page_URL"],
                    color: "#3b5998", // Facebook blue
                    tooltip: "Facebook"
                },
                {
                    icon: "<img src='https://i.ibb.co/T0s5JyK/icons8-messenger-50.png' alt='Messenger'>",
                    url: item["Facebook Messenger"],
                    color: "#0084ff", // Messenger blue
                    tooltip: "Messenger"
                },
                {
                    icon: "<img src='https://i.ibb.co/jk7dhy0/icons8-google-maps-50.png' alt='Google Maps'>",
                    url: item["Google Maps"],
                    color: "#4285f4", // Google blue
                    tooltip: "Google Maps"
                },
                {
                    icon: "<img src='https://i.ibb.co/NWqQ2mT/icons8-waze-50.png' alt='Waze'>",
                    url: item["Waze"],
                    color: "#ff9800", // Waze orange
                    tooltip: "Waze"
                }
            ];

            buttons.forEach(button => {
                if (button.url) {
                    popupContent += "<div class='button' style='background-color:" + button.color + ";'><a href='" + button.url + "' target='_blank' style='display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; width: 100%; height: 100%; position: relative;'>" + button.icon + "<span class='tooltip'>" + button.tooltip + "</span></a></div>";
                }
            });

            popupContent += "</div>"; // End of buttons container

            const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(popupContent);
            markers.addLayer(marker);
        }
    });

    // Add the MarkerClusterGroup to the map
    map.addLayer(markers);
}



/*** RESET FILTERS BUTTON **/
// Function to reset filters
function resetFilters() {
    clearCategorySelection();

    
    // Remove existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // Hide no results message and result count
    hideNoResultsMessage();
    hideResultCount();
    
    // Reset map view to initial extent
    map.setView([0.00, 0.00], 3);
    
    // Display initial points
    displayInitialPoints();

    // Reset total projects count
    updateTotalProjectsCount(data.length);
}



// Event listener for Reset Filters button
$('.reset-filters-button').on('click', function () {
    resetFilters(); // Reset all filters
    resetCountryChart(); // Reset the country pie chart
});



/*** APPLY FILTERS BUTTON **/
// Function to display number of results
function displayResultCount(count) {
    const resultCountContainer = document.getElementById("resultCount");
    resultCountContainer.textContent = `${count} project${count === 1 ? '' : 's'} matched the criteria`;
    resultCountContainer.style.display = "block";
}

// Function to hide number of results
function hideResultCount() {
    const resultCountContainer = document.getElementById("resultCount");
    resultCountContainer.style.display = "none";
}

// Function to display no results message
function displayNoResultsMessage() {
    const messageContainer = document.getElementById("noResultsMessage");
    messageContainer.style.display = "block";
}

// Function to hide no results message
function hideNoResultsMessage() {
    const messageContainer = document.getElementById("noResultsMessage");
    messageContainer.style.display = "none";
}

// Function to zoom the map to the extent of filtered points/markers
function zoomToFilteredPoints(filteredData) {
    if (filteredData.length > 0) {
        // Extract latitudes and longitudes of filtered points
        var latlngs = filteredData.map(function (project) {
            return [results._geolocation.1, results._geolocation.2];
        });

        // Create a LatLngBounds object
        var bounds = L.latLngBounds(latlngs);

        // Set maximum zoom level
        var maxZoomLevel = 5; // Adjust this value as needed

        // Zoom the map to the extent of the bounds, limited by maxZoomLevel
        map.fitBounds(bounds, { maxZoom: maxZoomLevel });
    }
}



/*** APPLY FILTERS BUTTON **/
// Event listener for Apply Filters button
$('.apply-filters-button').on('click', function () {
    // Get selected countries, categories


    var selectedCategories = getSelectedCategories();
    

    // Filter data based on selected criteria
    var filteredData = data.filter(function (project) {
        var startYear = new Date(project.startDate).getFullYear();
        var completionYear = new Date(project.completionDate).getFullYear();
        return (

            (
                selectedCategories.length === 0 ||
                selectedCategories.includes(project.sector1) ||
                selectedCategories.includes(project.sector2)
            ) 
        );
    });

    // Update total projects count
    updateTotalProjectsCount(filteredData.length);


    // Check if filtered data is empty
    if (filteredData.length === 0) {
        displayNoResultsMessage();
        hideResultCount(); // hide result count if no results
    } else {
        hideNoResultsMessage();
        displayResultCount(filteredData.length); // display result count if there are results
    }

    // Remove existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for filtered data
    filteredData.forEach(function (project) {
        const popupContent = `
            <h2>${project.projectName}<br></h2>
            <b>Country:</b> ${project.country}<br>
            <b>Location:</b> ${project.location}<br>
            <b>Start Date:</b> ${project.startDate}<br>
            <b>Completion Date:</b> ${project.completionDate}<br>
            <b>Partner(s):</b> ${project.partner}<br>
            <b>Client:</b> ${project.client}<br>
            <b>Description:</b><div style="text-align: justify;">${project.description}</div>
            <!-- <b>Project Value ($):</b> ${project.projectValue}<br> -->
            <b>Project Scale:</b> ${project.projectScale}ha<br>
            <b>Status:</b> ${project.status}<br>
            <b>Sector:</b> ${project.sector1}, ${project.sector2}<br>
            <p></p>
            <p style="font-size: 10px;"><i>Note: Project pinned location is indicative only</i></p>
            <div class="image-container">
                <a href="${project.photo1}" target="_blank">
                    <img src="${project.photo1}" class="popup-image" id="popup-image">
                </a>
            </div>
            <div class="button-container">
                <div class="nav-buttons">
                    <button class="prev-button" onclick="prevImage('${project.photo1}', '${project.photo2}')" title="Show previous image">navigate_before</button>
                    <button class="next-button" onclick="nextImage('${project.photo1}', '${project.photo2}')" title="Show next image">navigate_next</button>
                </div>
                <div>
                    <a href="${project.attachment}" target="_blank" style="text-decoration: none;">
                        <button class="download-button" style="display: flex; align-items: center;">
                            <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">description</span>
                            <span style="margin-left: 5px; vertical-align: middle; margin-top: -3px;">Download Project Sheet</span>
                        </button>
                    </a>
                </div>
                <span class="material-icons-outlined close-button" onclick="closePopup()">
                    highlight_off
                </span>
            </div>
        `;
        const marker = L.marker([project.lat, project.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(popupContent, { maxWidth: 300 });
    });

    // Zoom the map to the extent of the filtered points/markers
    zoomToFilteredPoints(filteredData);


    var selectedCategories = getSelectedCategories();



    console.log("Selected Categories:", selectedCategories);


});