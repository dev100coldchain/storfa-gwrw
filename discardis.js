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
            Ecwid.OnCartChanged.add(function (cart) {
              cart.calculateTotal(function (order) {
                console.log(JSON.stringify(order));
                const customElement = document.createElement('div');
                // customElement.innerHTML = '<p>Bonne fin de journée !</p>';
                // customElement.innerHTML = '<p><span style="background-color: #EEE8AA;">Remise 5% sur la prochaine commande avec paiement à réception de la facture</span></p>';
                const highlightColor = '#EEE8AA'; // Pale Goldenrod
                const cartTotal = (order.total * 0.05).toFixed(2); // Calculate 5% of the total
                customElement.innerHTML = `<p><span style="background-color: ${highlightColor};">Remise 5% sur la prochaine commande avec paiement à réception de la facture : ${cartTotal} €</span></p>`;
                cartContainer.appendChild(customElement);
              });
            });
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