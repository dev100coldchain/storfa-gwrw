(function waitForEcwidOnAPILoaded(retries = 10, delay = 500) {
  if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function') {
    Ecwid.OnAPILoaded.add(function () {
      console.log("Ecwid JS API is loaded (from retry " + (10 - retries) + " ).");
      if (Ecwid.Cart) {
        Ecwid.Cart.calculateTotal(function (order) {
          console.log('Ecwid.Cart.calculateTotal : ' + JSON.stringify(order));
        });
        console.log('"ec-cart-summary__total" getElementsByClassName :');
        const targetElement = document.getElementsByClassName("ec-cart-summary__total")[0];
        // Create a new element
        const newElement = document.createElement("span");
        newElement.textContent = "Bonne fin de journée";

        // Insert it after the target
        targetElement.after(newElement);
      } else {
        console.warn("Ecwid.Cart is not available yet (from retry).");
      }
    });
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidOnAPILoaded(retries - 1, delay), delay);
  } else {
    console.error("Ecwid.OnAPILoaded is not available after multiple attempts.");
  }
})();