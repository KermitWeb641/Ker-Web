import { CONFIG } from './config.js';

export function createSideMenuButton(tabId) {
    const sideMenuButton = document.createElement('button');
    sideMenuButton.classList.add('side-menu-button');
    sideMenuButton.style.cssText = `
        position: fixed;
        left: 10px;
        top: 85px;  
        transform: none;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1000;
        width: 50px;
        height: 50px;
        padding: 0;
        background-color: rgba(255,255,255,0.1);
        border-radius: 50%;
        transition: 
            background-color 0.3s ease, 
            transform 0.3s ease, 
            box-shadow 0.3s ease;
    `;

    const sideMenuIcon = document.createElement('img');
    sideMenuIcon.src = CONFIG.SIDE_MENU_ICON_URL;
    sideMenuIcon.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
    `;

    sideMenuButton.appendChild(sideMenuIcon);

    // Create sliding side bar
    const sideBar = document.createElement('div');
    sideBar.id = `sideBar-${tabId}`;
    sideBar.style.cssText = `
        position: fixed;
        top: 0;
        left: -${CONFIG.SIDE_MENU_WIDTH}px;
        width: ${CONFIG.SIDE_MENU_WIDTH}px;
        height: 100vh;
        background-color: rgba(30, 30, 30, 0.95); 
        z-index: 999;
        transition: left 0.3s ease;
        color: white;
        padding: 30px; 
        box-sizing: border-box;
        backdrop-filter: blur(15px); 
        display: flex;
        flex-direction: column;
    `;

    // Side bar title
    const sideBarTitle = document.createElement('h2');
    sideBarTitle.textContent = 'Quick Links';
    sideBarTitle.style.cssText = `
        margin-bottom: 30px;
        font-size: 24px;
        text-align: center;
        color: #ADD8E6;
    `;
    sideBar.appendChild(sideBarTitle);

    // Link Search Container
    const linkSearchContainer = document.createElement('div');
    linkSearchContainer.style.cssText = `
        display: flex;
        margin-bottom: 20px;
        width: 100%; /* Ensure full width */
    `;

    const linkSearchInput = document.createElement('input');
    linkSearchInput.type = 'text';
    linkSearchInput.placeholder = 'Enter URL or search term';
    linkSearchInput.style.cssText = `
        flex-grow: 1;
        padding: 10px;
        background-color: rgba(255,255,255,0.1);
        border: 1px solid #444;
        color: white;
        border-radius: 4px;
        width: calc(100% - 80px); /* Adjust to fit exactly */
        box-sizing: border-box; /* Include padding and border in width calculation */
    `;

    const linkGoButton = document.createElement('button');
    linkGoButton.textContent = 'Go';
    linkGoButton.style.cssText = `
        margin-left: 10px;
        padding: 10px 15px;
        background-color: #ADD8E6;
        color: black;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 70px; /* Fixed width */
        box-sizing: border-box; /* Include padding and border in width calculation */
    `;

    linkGoButton.addEventListener('click', () => {
        const inputValue = linkSearchInput.value.trim();
        const searchFrame = document.getElementById(`searchFrame-${tabId}`);
        const searchForm = document.getElementById(`searchForm-${tabId}`);
        const tabText = document.querySelector(`.tab-button[data-tab-id="${tabId}"] .tab-text`);
        const heading = document.getElementById(`tabPage-${tabId}`).querySelector('h1');
        const actionButton = document.getElementById(`tabPage-${tabId}`).querySelector('.action-button');

        if (inputValue) {
            let url = inputValue;
            
            // Add protocol if not present
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // Check if it looks like a valid domain
                if (url.includes('.')) {
                    url = `https://${url}`;
                } else {
                    // Assume it's a search query
                    url = `https://www.bing.com/search?q=${encodeURIComponent(inputValue)}`;
                }
            }

            searchFrame.src = url;
            searchFrame.style.display = 'block';
            searchForm.style.display = 'none';
            tabText.textContent = inputValue;

            if (heading) {
                heading.style.display = 'none';
            }

            if (actionButton) {
                actionButton.style.display = 'none';
            }

            // Reset side menu
            sideBar.style.left = `-${CONFIG.SIDE_MENU_WIDTH}px`;
        }
    });

    linkSearchContainer.appendChild(linkSearchInput);
    linkSearchContainer.appendChild(linkGoButton);
    sideBar.appendChild(linkSearchContainer);

    sideMenuButton.addEventListener('click', () => {
        const existingSideBar = document.getElementById(`sideBar-${tabId}`);
        if (existingSideBar) {
            if (existingSideBar.style.left === '0px') {
                existingSideBar.style.left = `-${CONFIG.SIDE_MENU_WIDTH}px`;
            } else {
                existingSideBar.style.left = '0px';
            }
        }
    });

    // Hover effects
    sideMenuButton.addEventListener('mouseover', () => {
        sideMenuButton.style.backgroundColor = 'rgba(255,255,255,0.3)';
        sideMenuButton.style.transform = 'scale(1.15)';
        sideMenuButton.style.boxShadow = '0 6px 8px rgba(0,0,0,0.3)';
        sideMenuIcon.style.transform = 'scale(1.1)';
    });

    sideMenuButton.addEventListener('mouseout', () => {
        sideMenuButton.style.backgroundColor = 'rgba(255,255,255,0.1)';
        sideMenuButton.style.transform = 'scale(1)';
        sideMenuButton.style.boxShadow = 'none';
        sideMenuIcon.style.transform = 'scale(1)';
    });

    return { 
        button: sideMenuButton, 
        sidebar: sideBar 
    };
}