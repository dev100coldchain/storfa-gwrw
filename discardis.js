Ecwid.OnAPILoaded.add(function() {
  if (typeof Ecwid.OnCartChanged?.add === "function") {
    Ecwid.OnCartChanged.add(function(cart) {
      console.log("Cart changed:", cart);
    });
  }
});
