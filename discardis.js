(function waitForEcwidOnAPILoaded(retries = 10, delay = 500) {
  if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function') {
    Ecwid.OnAPILoaded.add(function () {
      console.log("Ecwid JS API is loaded (from retry " + (10 - retries) + " ).");
      if (Ecwid.Cart) {
        Ecwid.Cart.calculateTotal(function (order) {
          console.log('Ecwid.Cart.calculateTotal : ' + JSON.stringify(order));
        });
      } else {
        console.warn("Ecwid.Cart is not available yet (from retry).");
      }
      Ecwid.OnPageLoaded.add(function (page) {
        if (page.type === "CART") {
          // const cartContainer = document.getElementsByClassName('ec-cart__sidebar-inner')[0];
          const cartContainer = document.getElementsByClassName('ec-cart__buy-and-save')[0];
          if (cartContainer) {
            console.log("'ec-cart__sidebar-inner' exists.");
            const customElement = document.createElement('div');
            customElement.innerHTML = '<p>Bonne fin de journée !</p>';
            cartContainer.appendChild(customElement);
          }
        }
      });
    });
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidOnAPILoaded(retries - 1, delay), delay);
  } else {
    console.error("Ecwid.OnAPILoaded is not available after multiple attempts.");
  }
})();