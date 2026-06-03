document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Array of images for the flipbook.
    // Replace these URLs with the actual paths to your uploaded images later!
    // Example: 'images/page1.jpg'
    const pages = [];
    for (let i = 1; i <= 43; i++) {
        // Format number with leading zeros: 0001, 0002, etc.
        const numStr = i.toString().padStart(4, '0');
        pages.push(`mag preview/PDF Final_page-${numStr}.jpg`);
    }

    const flipbookEl = document.getElementById('flipbook');

    let loadedImages = 0;
    const pageElements = [];

    pages.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        
        img.onload = function() {
            const isSpread = img.naturalWidth > img.naturalHeight * 1.2;
            
            if (isSpread) {
                // Left Page
                const leftPage = document.createElement('div');
                leftPage.className = 'page';
                leftPage.style.backgroundImage = `url("${src}")`;
                leftPage.style.backgroundSize = '200% 100%';
                leftPage.style.backgroundPosition = 'left center';
                leftPage.style.backgroundRepeat = 'no-repeat';
                leftPage.dataset.originalIndex = index;
                pageElements.push(leftPage);
                
                // Right Page
                const rightPage = document.createElement('div');
                rightPage.className = 'page';
                rightPage.style.backgroundImage = `url("${src}")`;
                rightPage.style.backgroundSize = '200% 100%';
                rightPage.style.backgroundPosition = 'right center';
                rightPage.style.backgroundRepeat = 'no-repeat';
                rightPage.dataset.originalIndex = index + 0.5;
                pageElements.push(rightPage);
                
            } else {
                // Single Page
                const singlePage = document.createElement('div');
                singlePage.className = 'page';
                singlePage.style.backgroundImage = `url("${src}")`;
                singlePage.style.backgroundSize = '100% 100%';
                singlePage.style.backgroundPosition = 'center';
                singlePage.style.backgroundRepeat = 'no-repeat';
                singlePage.dataset.originalIndex = index;
                
                if (index === 0 || index === pages.length - 1) {
                    singlePage.classList.add('hard');
                }
                
                pageElements.push(singlePage);
            }
            
            loadedImages++;
            
            if (loadedImages === pages.length) {
                // Sort by original index
                pageElements.sort((a, b) => parseFloat(a.dataset.originalIndex) - parseFloat(b.dataset.originalIndex));
                
                // Append
                pageElements.forEach(page => {
                    flipbookEl.appendChild(page);
                });
                
                setTimeout(() => {
                    const pageFlip = new St.PageFlip(flipbookEl, {
                        width: 400,
                        height: 565,
                        size: "stretch",
                        minWidth: 315,
                        maxWidth: 1000,
                        minHeight: 420,
                        maxHeight: 1350,
                        maxShadowOpacity: 0.5,
                        showCover: true,
                        mobileScrollSupport: false
                    });

                    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

                    document.getElementById('btn-prev').addEventListener('click', () => {
                        pageFlip.flipPrev();
                    });

                    document.getElementById('btn-next').addEventListener('click', () => {
                        pageFlip.flipNext();
                    });

                    const pageCurrentEl = document.getElementById('page-current');
                    const pageTotalEl = document.getElementById('page-total');

                    pageFlip.on('init', (e) => {
                        pageTotalEl.innerText = pageFlip.getPageCount();
                        updatePageCounter(e.data);
                    });

                    pageFlip.on('flip', (e) => {
                        updatePageCounter(e.data);
                    });

                    function updatePageCounter(currentPageIndex) {
                        let displayStr = `${currentPageIndex + 1}`;
                        if (pageFlip.getOrientation() === 'landscape' && currentPageIndex > 0 && currentPageIndex < pageFlip.getPageCount() - 1) {
                             displayStr = `${currentPageIndex + 1} - ${currentPageIndex + 2}`;
                        }
                        pageCurrentEl.innerText = displayStr;
                    }
                }, 100);
            }
        };
    });
});
