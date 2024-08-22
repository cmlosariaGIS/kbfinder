// favorites.js

let heartStatus = JSON.parse(localStorage.getItem('heartStatus')) || {};

function formatCategory(category) {
    if (category.toLowerCase() === 'others__iba_pa') {
        return 'Others';
    }
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function updateFavoritesList() {
    const favoritesList = document.getElementById('favorites-list');
    const favoritesSlideUpContent = document.querySelector('.favorites-panel-content');
    let favoritesContent = '';

    Object.keys(heartStatus).forEach(businessName => {
        if (heartStatus[businessName] && heartStatus[businessName].isFavorite) {
            const businessCategory = heartStatus[businessName].category ? formatCategory(heartStatus[businessName].category) : 'Uncategorized';
            
            const favoriteItemHtml = `
            <div class="favorite-item" data-business-name="${businessName}">
                <span style="font-size: 18px;">${businessName}</span>
                <span style="font-size: 14px;"> (${businessCategory})</span>
            </div>
        `;
            
            favoritesContent += favoriteItemHtml;
        }
    });

    favoritesList.innerHTML = favoritesContent;
    favoritesSlideUpContent.innerHTML = favoritesContent;

    // Add click event listeners
    const favoriteItems = document.querySelectorAll('.favorite-item');
    favoriteItems.forEach(item => {
        item.addEventListener('click', () => {
            window.flyToMarker(item.dataset.businessName);
            if (window.innerWidth <= 768) {
                hideFavoritesSlideUp();
            }
        });
    });

    updateFavoritesSidebarVisibility();
}

function updateFavoritesSidebarVisibility() {
    const favoritesSidebar = document.getElementById('favorites');
    const favoritesList = document.getElementById('favorites-list');
    const favoritesButton = document.getElementById('favoriteButton');

    if (favoritesList.innerHTML === '') {
        favoritesSidebar.classList.add('hidden');
        favoritesSidebar.classList.remove('show');
        favoritesButton.style.display = 'none';
    } else {
        favoritesSidebar.classList.remove('hidden');
        favoritesButton.style.display = 'block';
    }
}

function toggleHeartStatus(businessName, category) {
    if (!heartStatus[businessName]) {
        heartStatus[businessName] = { isFavorite: false, category: category };
    }
    heartStatus[businessName].isFavorite = !heartStatus[businessName].isFavorite;
    localStorage.setItem('heartStatus', JSON.stringify(heartStatus));
    updateFavoritesList();
}

function getHeartStatus(businessName) {
    return heartStatus[businessName] && heartStatus[businessName].isFavorite ? 'pink' : '#b9b0b0';
}

function initializeFavorites() {
    const favoritesSidebar = document.getElementById('favorites');
    const favoriteButton = document.getElementById('favoriteButton');
    const favoritesSlideUpPanel = document.getElementById('favorites-slide-up-panel');

    favoritesSidebar.classList.add('hidden');
    favoritesSlideUpPanel.classList.add('hidden');

    favoriteButton.addEventListener('click', toggleFavorites);

    document.getElementById('close-favorites').addEventListener('click', () => {
        favoritesSidebar.classList.add('hidden');
        favoritesSidebar.classList.remove('show');
    });

    const panelHandle = favoritesSlideUpPanel.querySelector('.panel-handle');
    panelHandle.addEventListener('click', hideFavoritesSlideUp);

    updateFavoritesList();
}

function toggleFavorites() {
    if (window.innerWidth <= 768) {
        toggleFavoritesSlideUp();
    } else {
        toggleFavoritesSidebar();
    }
}

function toggleFavoritesSidebar() {
    const favoritesSidebar = document.getElementById('favorites');
    favoritesSidebar.classList.toggle('show');
    favoritesSidebar.classList.toggle('hidden');
}

function toggleFavoritesSlideUp() {
    const favoritesSlideUpPanel = document.getElementById('favorites-slide-up-panel');
    favoritesSlideUpPanel.classList.toggle('active');
    favoritesSlideUpPanel.classList.toggle('hidden');
}

function hideFavoritesSlideUp() {
    const favoritesSlideUpPanel = document.getElementById('favorites-slide-up-panel');
    favoritesSlideUpPanel.classList.remove('active');
    favoritesSlideUpPanel.classList.add('hidden');
}

window.addEventListener('resize', () => {
    const favoritesSidebar = document.getElementById('favorites');
    const favoritesSlideUpPanel = document.getElementById('favorites-slide-up-panel');

    if (window.innerWidth <= 768) {
        favoritesSidebar.classList.add('hidden');
        favoritesSidebar.classList.remove('show');
    } else {
        favoritesSlideUpPanel.classList.remove('active');
        favoritesSlideUpPanel.classList.add('hidden');
    }
});

// Export functions to be used in the main script
window.favorites = {
    updateFavoritesList,
    toggleHeartStatus,
    getHeartStatus,
    initializeFavorites,
    toggleFavorites
};