Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.OnPageLoad.add(function () {
        console.log("Page DOM has just loaded");
    });
});