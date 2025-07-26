Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.setPage('cart');

    Ecwid.OnPageLoaded.add(function (page) {
        if (page.type == "CART") {
            console.log(page);
        }
    });
});