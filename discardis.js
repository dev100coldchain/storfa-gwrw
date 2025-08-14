(function waitForEcwidOnAPILoaded(retries = 10, delay = 500) {
  // console.log("window.location.hostname : " + window.location.hostname + " window.location.pathname : " + window.location.pathname);
  if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function' &&
    Ecwid.OnCartChanged && typeof Ecwid.OnCartChanged.add === 'function') {
    Ecwid.OnAPILoaded.add(function () {
      // console.log("Ecwid JS API is loaded (from retry " + (10 - retries) + " ).");
      waitForEcwidCartObject(retries = 10, delay = 500);
      Ecwid.OnCartChanged.add(function () {
        waitForEcwidCartObject(retries = 10, delay = 500);
      });
      Ecwid.OnPageLoaded.add(function () {
        displayRemiseFivePercent();
        waitForEcwidCartObject(retries = 10, delay = 500);
      });
      Ecwid.OnPageSwitch.add(function () {
        displayRemiseFivePercent();
        waitForEcwidCartObject(retries = 10, delay = 500);
      });
      Ecwid.OnOrderPlaced.add(function () {
        displayRemiseFivePercent();
        waitForEcwidCartObject(retries = 10, delay = 500);
      });
    });
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidOnAPILoaded(retries - 1, delay), delay);
  } else {
    // console.error("Ecwid.OnAPILoaded is not available after multiple attempts.");
  }
})();

function displayRemiseFivePercent() {
  const cartContainer = document.getElementsByClassName('ec-cart__buy-and-save')[0];
  if (cartContainer) {
    // console.log("'ec-cart__buy-and-save' exists.");
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
    // console.log("'ec-cart__buy-and-save' does not exist.");
  }
}

function removeTextFormatColonSpace() {
  // const elements = document.getElementsByClassName('ec-cart-option ec-cart-option--key');
  // for (let i = 0; i < elements.length; i++) {
  //   elements[i].innerHTML = '';
  // }

  const containers = document.getElementsByClassName('ec-cart-item__wrap');
  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    for (let j = 0; j < container.children.length; j++) {
      const child = container.children[j];
      if (child.classList.contains('ec-cart-option') && child.classList.contains('ec-cart-option--key')) {
        child.innerHTML = '';
      }
    }

    // if (container.classList.contains('ec-cart-option') && container.classList.contains('ec-cart-option--key')) {
    //   container.innerHTML = '';
  }
}

function waitForEcwidCartObject(retries, delay) {
  if (Ecwid.Cart && document.getElementsByClassName('ec-cart__buy-and-save').length && document.getElementsByClassName('ec-cart-option ec-cart-option--key').length) {
    // console.log("Ecwid.Cart object, ec-cart__buy-and-save element and ec-cart-option ec-cart-option--key are all available (from retry " + (10 - retries) + " ).");
    displayRemiseFivePercent();
    removeTextFormatColonSpace();
  } else if (retries > 0) {
    setTimeout(() => waitForEcwidCartObject(retries - 1, delay), delay);
  } else {
    // console.error("Ecwid.Cart object and ec-cart__buy-and-save element are not both available after multiple attempts.");
  }
}