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
  const elements = document.getElementsByClassName('ec-cart-option ec-cart-option--key');
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = '';
  }

  const containers = document.getElementsByClassName('ec-cart-item__wrap');
  for (let i = 0; i < containers.length; i++) {
    console.log('arrived at marker');
    const container = containers[i];

    const formatValues = container.getElementsByClassName('ec-cart-option ec-cart-option--value');
    // for (let j = 0; j < optionDescendants.length; j++) {
    console.log('formatValues[0] : ', formatValues[0]);

    if (formatValues[0]) {
      const match = formatValues[0].textContent.match(/(\d+)x/).replace(/x/g, '');
      if (match) {
        const extractedNumber = match[0];
        console.log('Extracted number:', extractedNumber); // "12" from "Canette 12x44cl"
        // You can use extractedNumber as needed here
        const lineAmounts = container.getElementsByClassName('ec-cart-item__price-inner');
        const priceText = lineAmounts[0].innerHTML.replace(/,/g, '.');
        const priceValue = priceText.match(/(\d+(\.\d+)?)/);
        console.log('Extracted price:', priceValue[0]);
      }
    }
    // const unitPrice = (lineAmounts[0] / extractedNumber).toFixed(2).toString().replace(/./g, ',');

    // const unitPrice = (lineAmounts[0] / extractedNumber);
    // console.log('lineAmounts[0] : ', lineAmounts[0]);
    // console.log('lineAmounts[0] / extractedNumber : ', '( ' + unitPrice + ' € )');
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