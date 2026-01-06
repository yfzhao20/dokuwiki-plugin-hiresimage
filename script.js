/**
 * HiRes Image: Enhances image sharpness by loading original files.
 */
(function() {
    "use strict";

    const sharpen = function(img) {
        if (!img || img.dataset.hiResProcessed) return;

        try {
            const url = new URL(img.src);
            
            // Match images scaled by DokuWiki (containing w= or h=)
            if (url.searchParams.has('w') || url.searchParams.has('h')) {
                const w = url.searchParams.get('w');
                const h = url.searchParams.get('h');

                // Remove scaling parameters and security tokens to fetch original
                url.searchParams.delete('w');
                url.searchParams.delete('h');
                url.searchParams.delete('tok'); 
                
                img.src = url.toString();

                // Apply CSS constraints to maintain intended layout size
                if (w) {
                    img.style.width = w + 'px';
                }
                else {
                    img.style.width = 'auto';
                } 
                
                if (h) {
                    img.style.height = h + 'px';
                }
                else {
                    img.style.height = 'auto';
                }

                // Optimization for High-DPI (Retina) displays
                img.style.imageRendering = '-webkit-optimize-contrast';
                img.dataset.hiResProcessed = "true";
            }
        } catch (e) {
            // Ignore parsing errors for non-standard URLs
        }
    };

    const scan = function() {
        const sel = 'img.media, img.medialeft, img.mediaright, img.mediacenter';
        document.querySelectorAll(sel).forEach(sharpen);
    };

    // Run on initial page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scan);
    } else {
        scan(); // Run immediately
    }

    // Dynamic observer for editors (like Prosemirror) or async content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG') {
                            sharpen(node);
                        } else {
                            node.querySelectorAll('img').forEach(sharpen);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();