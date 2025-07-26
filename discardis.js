Ecwid.OnAPILoaded.add(function () {
    (function checkEcwidAPI() {
        const checks = [
            { name: "Ecwid", test: () => typeof Ecwid !== "undefined" },
            { name: "Ecwid.navigateTo", test: () => typeof Ecwid?.navigateTo === "function" },
            { name: "Ecwid.OnPageLoaded.add", test: () => typeof Ecwid?.OnPageLoaded?.add === "function" },
            { name: "Ecwid.OnCartChanged.add", test: () => typeof Ecwid?.OnCartChanged?.add === "function" },
            { name: "Ecwid.OnOrderPlaced.add", test: () => typeof Ecwid?.OnOrderPlaced?.add === "function" },
            { name: "Ecwid.OnProductAddedToCart.add", test: () => typeof Ecwid?.OnProductAddedToCart?.add === "function" },
            { name: "Ecwid.OnAPILoaded.add", test: () => typeof Ecwid?.OnAPILoaded?.add === "function" },
        ];

        console.log("🔍 Ecwid JS API Function Check:");
        checks.forEach(({ name, test }) => {
            try {
                const result = test();
                console.log(`✅ ${name}: ${result ? "Available" : "Not available"}`);
            } catch (e) {
                console.log(`❌ ${name}: Error during check`);
            }
        });
    })();
});