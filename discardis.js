Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.OnPageLoaded.add(function (page) {
        console.log(JSON.stringify(page));
    });
});