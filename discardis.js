(function waitForEcwidOnAPILoaded(retries = 10, delay = 500) {
  if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function') {
    Ecwid.OnAPILoaded.add(function () {
      console.log("Ecwid JS API is loaded (from retry " + (10 - retries) + " ).");
      if (Ecwid.Cart) {
        Ecwid.Cart.calculateTotal(function (order) {
          console.log('Ecwid.Cart.calculateTotal : ' + JSON.stringify(order));
        });
        console.log('".ec-cart-summary__total" search :' );
        const items = document.querySelectorAll(".ec-cart-summary__total");
        items.forEach(item => console.log(item.textContent));
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