(function waitForEcwidOnAPILoaded(retries = 10, delay = 500) {
  console.log("window.location.hostname : " + window.location.hostname + " window.location.pathname : " + window.location.pathname);
  if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function' &&
    Ecwid.OnCartChanged && typeof Ecwid.OnCartChanged.add === 'function') {
    Ecwid.OnAPILoaded.add(function () {
      console.log("Ecwid JS API is loaded (from retry " + (10 - retries) + " ).");
      waitForEcwidCartObject(retries = 10, delay = 500);
      Ecwid.OnCartChanged.add(function () {
        displayRemiseFivePercent();
      });
      Ecwid.OnPageLoaded.add(function () {
        displayRemiseFivePercent();
      });
      Ecwid.OnPageSwitch.add(function () {
        displayRemiseFivePercent();
      });
      Ecwid.OnOrderPlaced.add(function () {
        displayRemiseFivePercent();
      });
    });
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidOnAPILoaded(retries - 1, delay), delay);
  } else {
    console.error("Ecwid.OnAPILoaded is not available after multiple attempts.");
  }
})();

function displayRemiseFivePercent() {
  const cartContainer = document.getElementsByClassName('ec-cart__buy-and-save')[0];
  if (cartContainer) {
    console.log("'ec-cart__buy-and-save' exists.");
    Ecwid.Cart.calculateTotal(function (order) {
      // console.log(JSON.stringify(order));
      const customElement = document.createElement('div');
      customElement.className = 'tontapRemise';
      const highlightColor = '#EEE8AA'; // Pale Goldenrod
      const fivePercentRemise = (order.total * 0.05).toFixed(2); // Calculate 5% of the total
      // Format number as French (France)
      const formattedFivePercentRemise = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        useGrouping: true
      }).format(fivePercentRemise);
      // const tontapRemiseHTML = `<p><span style="background-color: ${highlightColor};">Remise 5% sur la prochaine commande avec paiement à récep de la fac : ${formattedFivePercentRemise} TTC</span></p>`;
      const tontapRemiseHTML = `<p><span style="background-color: ${highlightColor};">&nbsp;Remise 5%&nbsp;</span>&nbsp;sur la prochaine cmde avec paiement à récep de la facture <span style="background-color: ${highlightColor};">&nbsp;${formattedFivePercentRemise}ttc&nbsp;</span></p>`;
      if (document.getElementsByClassName('tontapRemise')[0]) {
        document.getElementsByClassName('tontapRemise')[0].innerHTML = tontapRemiseHTML;
      } else {
        cartContainer.appendChild(customElement);
        customElement.innerHTML = tontapRemiseHTML;
      }
    });
  } else {
    console.log("'ec-cart__buy-and-save' does not exist.");
  }
}

function waitForEcwidCartObject(retries, delay) {
  if (Ecwid.Cart && document.getElementsByClassName('ec-cart__buy-and-save').length) {
    console.log("Ecwid.Cart object and ec-cart__buy-and-save element are both available (from retry " + (10 - retries) + " ).");
    displayRemiseFivePercent();
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidCartObject(retries - 1, delay), delay);
  } else {
    console.error("Ecwid.Cart object and ec-cart__buy-and-save element are not both available after multiple attempts.");
  }
}