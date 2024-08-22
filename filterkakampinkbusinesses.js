
//Filter Kakampink Businesses..
// Function to handle filtering for a specific category
function setupFilter(category, buttonClass, activeClass) {
    let isFiltered = false;

    // Function to handle the filtering logic
    function handleFilter(button) {
        if (isFiltered && button.classList.contains(activeClass)) {
            // If the same button is clicked again, deactivate it and show all markers
            addMarkers(data); // Show all markers
            document.querySelectorAll(buttonClass).forEach(btn => btn.classList.remove(activeClass));
            isFiltered = false;
        } else {
            // Filter markers and activate the clicked button
            const filteredData = data.filter(item => item["Business Categories"] === category);
            addMarkers(filteredData); // Show only filtered markers

            // Remove active class from all buttons
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove(activeClass));

            // Add active class to the clicked button
            document.querySelectorAll(buttonClass).forEach(btn => btn.classList.add(activeClass));

            isFiltered = true;
        }
    }

    // Add event listeners to both desktop and mobile buttons
    document.querySelectorAll(buttonClass).forEach(button => {
        button.addEventListener('click', () => handleFilter(button));
    });
}

// Setup filters for different categories
setupFilter("bakeshop", '.bakeshops-filter', 'active-bakeshops');
setupFilter("restaurants", '.restaurants-filter', 'active-restaurants');
setupFilter("food_business__homecook__snack", '.foodbusiness-filter', 'active-foodbusiness');
setupFilter("clothes_shop", '.clothesshop-filter', 'active-clothesshop');
setupFilter("coffee_shops", '.cafes-filter', 'active-cafes');
setupFilter("milk_tea", '.milktea-filter', 'active-milktea');

setupFilter("resorts", '.resort-filter', 'active-resort');
setupFilter("personalized_gifts__accessorie", '.gift-filter', 'active-gifts');
setupFilter("events__weddings__parties_and_", '.event-filter', 'active-events');
setupFilter("pet_shops", '.pet-filter', 'active-pet');
setupFilter("flowers_and_plant_shops", '.plant-filter', 'active-plant');
setupFilter("frozen_goods", '.frozen-goods-filter', 'active-frozen-goods');

setupFilter("consutlting_services", '.consulting-filter', 'active-consulting');
setupFilter("photography_videography_editin", '.photography-filter', 'active-photography');
setupFilter("electronics", '.electronics-filter', 'active-electronics');
setupFilter("shoppee_lazada_online_store", '.online-shops-filter', 'active-online-shops');
setupFilter("travel_agency", '.travel-agency-filter', 'active-travel-agency');
setupFilter("crochet_products", '.crochet-filter', 'active-crochet');
setupFilter("art_supplies", '.art-supplies-filter', 'active-art-supplies');
setupFilter("groceries", '.groceries-filter', 'active-groceries');
setupFilter("real_estate", '.real-estate-filter', 'active-real-estate');

// New filters
setupFilter("book_stores", '.book-stores-filter', 'active-book-stores');
setupFilter("bags_wallets_shoes", '.bags-wallets-shoes-filter', 'active-bags-wallets-shoes');
setupFilter("tattoo_piercings", '.tattoo-piercings-filter', 'active-tattoo-piercings');
setupFilter("print_shops", '.print-shops-filter', 'active-print-shops');
setupFilter("auto_mechanic", '.auto-mechanic-filter', 'active-auto-mechanic');
setupFilter("it_services", '.it-services-filter', 'active-it-services');
setupFilter("home_improvements", '.home-improvements-filter', 'active-home-improvements');
setupFilter("health_wellness", '.health-wellness-filter', 'active-health-wellness');
setupFilter("school", '.school-filter', 'active-school');


setupFilter("others__iba_pa", '.others-filter', 'active-others');








//More filters panel
document.addEventListener('DOMContentLoaded', () => {
    const moreButton = document.querySelector('.more-filter');
    const desktopPanel = document.querySelector('.more-filters-panel');
    const mobilePanel = document.querySelector('.more-filters-slide-up-panel');
    const closeButton = document.getElementById('close-more-filters');
    const closeMobileButton = document.getElementById('close-more-filters-mobile');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function openPanel() {
        if (isMobile()) {
            mobilePanel && mobilePanel.classList.add('active');
        } else {
            desktopPanel && desktopPanel.classList.add('active');
        }
    }

    function closePanel() {
        if (isMobile()) {
            mobilePanel && mobilePanel.classList.remove('active');
        } else {
            desktopPanel && desktopPanel.classList.remove('active');
        }
    }

    if (moreButton) {
        moreButton.addEventListener('click', openPanel);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closePanel);
    }

    if (closeMobileButton) {
        closeMobileButton.addEventListener('click', closePanel);
    }

    // Close panel when clicking outside (for mobile)
    document.addEventListener('click', (event) => {
        if (isMobile() && mobilePanel && mobilePanel.classList.contains('active') &&
            !mobilePanel.contains(event.target) && !moreButton.contains(event.target)) {
            closePanel();
        }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (!isMobile() && mobilePanel && mobilePanel.classList.contains('active')) {
            mobilePanel.classList.remove('active');
            desktopPanel && desktopPanel.classList.add('active');
        } else if (isMobile() && desktopPanel && desktopPanel.classList.contains('active')) {
            desktopPanel.classList.remove('active');
            mobilePanel && mobilePanel.classList.add('active');
        }
    });
});