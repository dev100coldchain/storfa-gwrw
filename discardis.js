Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.navigateTo("CART");

    Ecwid.OnPageLoaded.add(function (page) {
        if (page.type == "CART") {
            console.log(page);
        }
    });
});