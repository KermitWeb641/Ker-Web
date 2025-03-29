export function setupActionButtons(tabId, CONFIG) {
    const createActionButton = (imageUrl, clickHandler, altText) => {
        const actionButton = document.createElement('button');
        actionButton.classList.add('action-button');
        actionButton.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            width: 200px;  
        `;

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = altText;
        image.style.cssText = `
            max-width: 100%;
            border-radius: 8px;
            transition: transform 0.3s ease;
        `;

        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.05)';
        });

        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1)';
        });

        actionButton.appendChild(image);
        actionButton.addEventListener('click', clickHandler);

        return actionButton;
    };

    const createKermitWebHandler = (searchFrame, searchForm, tabText, heading, actionButton) => {
        return () => {
            searchFrame.src = 'https://kermitweb641.github.io/KermitWebGaming/';
            searchFrame.style.display = 'block';
            searchForm.style.display = 'none';
            tabText.textContent = 'KermitWeb Gaming';

            if (heading) heading.style.display = 'none';
            if (actionButton) actionButton.style.display = 'none';

            searchFrame.onload = () => {
                try {
                    const iframeDocument = searchFrame.contentDocument || searchFrame.contentWindow.document;
                    if (iframeDocument) {
                        const links = iframeDocument.querySelectorAll('a');
                        links.forEach(link => {
                            link.target = '_blank';
                        });
                    }
                } catch (e) {
                    console.error("Error accessing iframe content:", e);
                }
            };
        };
    };

    const createFNAFHandler = (searchFrame, searchForm, tabText, heading, actionButtons) => {
        return () => {
            searchFrame.src = 'https://fnafgaming.com/'; 
            searchFrame.style.display = 'block';
            searchForm.style.display = 'none';
            tabText.textContent = 'FNAF Games';

            if (heading) heading.style.display = 'none';
            actionButtons.forEach(button => {
                button.style.display = 'none';
            });

            searchFrame.onload = () => {
                try {
                    const iframeDocument = searchFrame.contentDocument || searchFrame.contentWindow.document;
                    if (iframeDocument) {
                        const links = iframeDocument.querySelectorAll('a');
                        links.forEach(link => {
                            link.target = '_blank';
                        });
                    }
                } catch (e) {
                    console.error("Error accessing iframe content:", e);
                }
            };
        };
    };

    return { 
        createActionButton, 
        createKermitWebHandler, 
        createFNAFHandler 
    };
}