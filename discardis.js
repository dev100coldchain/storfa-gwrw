Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.openPage('cart')

    Ecwid.OnPageLoaded.add(function (page) {
        if (page.type == "CART") {
            console.log(page);
        }
    });
});