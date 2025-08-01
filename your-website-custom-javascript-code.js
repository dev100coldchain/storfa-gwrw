<script>
    (function () {
        let redirectTimeout = null;

    function isUserLoggedOut() {
            return document.body.classList.contains('ecwid-customer-loggedOut');
        }

    function shouldRedirect() {
            const path = window.location.pathname;
    return (
    isUserLoggedOut() &&
    path.startsWith('/product') &&
    path !== '/products/account' &&
    path !== '/products/pages/privacy-policy' &&
    path !== '/products/pages/terms' &&
    path !== '/products/pages/about'
    );
        }

    function scheduleRedirect() {
        clearTimeout(redirectTimeout); // Clear any pending redirects

            // Set up a delayed redirect after 0.5 seconds
            redirectTimeout = setTimeout(() => {
                // Re-check before redirecting
                if (shouldRedirect()) {
        window.location.href = '/products/account';
                }
            }, 500);
        }

    function cancelRedirectIfLoggedIn() {
            if (!isUserLoggedOut()) {
        clearTimeout(redirectTimeout);
            }
        }

        // Observer to monitor class changes on <body>
        function setupObserver() {
            const observer = new MutationObserver(() => {
                if (isUserLoggedOut()) {
            scheduleRedirect();
                } else {
            cancelRedirectIfLoggedIn();
                }
            });

        observer.observe(document.body, {
            attributes: true,
        attributeFilter: ['class']
            });

        // Initial check on load
        if (isUserLoggedOut()) {
            scheduleRedirect();
            }
        }

        // Monitor SPA-style navigation
        function patchHistoryMethods() {
            const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        function onRouteChange() {
            // Wait briefly for class changes to settle
            setTimeout(() => {
                if (isUserLoggedOut()) {
                    scheduleRedirect();
                } else {
                    cancelRedirectIfLoggedIn();
                }
            }, 0);
            }

        history.pushState = function (...args) {
            originalPushState.apply(this, args);
        onRouteChange();
            };

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
        onRouteChange();
            };

        window.addEventListener('popstate', onRouteChange);
        }

        document.addEventListener('DOMContentLoaded', () => {
            patchHistoryMethods();
        setupObserver();
        });
    })();

</script>