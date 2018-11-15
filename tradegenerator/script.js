
const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  minimumFractionDigits: 2,
  style: 'currency',
});

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function nextFriday() {
    const d = new Date();
    switch (d.getDay()) {
        case 0: d.setDate(d.getDate() + 5); break;
        case 1: d.setDate(d.getDate() + 4); break;
        case 2: d.setDate(d.getDate() + 3); break;
        case 3: d.setDate(d.getDate() + 2); break;
        case 4: d.setDate(d.getDate() + 1); break;
        case 6: d.setDate(d.getDate() + 6); break;
    }
    return d;
}

function setDefaultExpirationDate() {
    const nextFridayDate = nextFriday();
    $('#expirationDate').val((nextFridayDate.getMonth() + 1) + '/' + nextFridayDate.getDate());
}

$(document).ready(() => {
    setDefaultExpirationDate();

    $('#displayTrade').click(() => {
        const ticker = $('#ticker').val().toUpperCase();
        const numberOfContracts = $('#numberOfContracts').val();
        const expirationDate = $('#expirationDate').val();
        const typeCallsOrPuts = capitalize($('input[name="type-calls-or-puts"]:checked').val());
        const leg1Strike = $('#leg1Strike').val();
        const leg1StrikeType = $('input[name="leg-1-buy-or-sell"]:checked').val();
        const leg2Strike = $('#leg2Strike').val();
        const leg2StrikeType = $('input[name="leg-2-buy-or-sell"]:checked').val();
        const averageCostOrCredit = $('#averageCostOrCredit').val();
        const currentPrice = $('#currentPrice').val();

        if (!ticker || !numberOfContracts || !expirationDate || !leg1Strike || !averageCostOrCredit || !currentPrice) {
            return;
        }

        $('#infoEntry, #positionDisplay').toggle();

        const dollarReturn = numberOfContracts * (currentPrice - averageCostOrCredit) * 100;
        const percentageReturn = Math.abs(dollarReturn / (numberOfContracts * averageCostOrCredit * 100)) * 100;

        $('#headerDisplay #optionName').text(`${ticker} $${leg1Strike} ${leg2Strike ? `/ $${leg2Strike} ${typeCallsOrPuts}` : typeCallsOrPuts.slice(0, -1)}`);
        $('#headerDisplay #viewTickerLink').text($('#headerDisplay #viewTickerLink').text().replace('{TICKER}', ticker));
        $('#numberOfContractsDisplay .sectionHeader').text($('#numberOfContractsDisplay .sectionHeader').text().replace('{PLACEHOLDER}', leg2Strike ? 'AMOUNT' : 'CONTRACTS'));
        $('#numberOfContractsDisplay .sectionValue').text(`${averageCostOrCredit < 0 ? '-' : '+'}${numberOfContracts}`);
        $('#equityDisplay .sectionValue').text(formatter.format(numberOfContracts * currentPrice * 100));
        $('#breakEvenPriceDisplay .sectionHeader').text($('#breakEvenPriceDisplay .sectionHeader').text().replace('{TICKER}', ticker));
        $('#breakEvenPriceDisplay .sectionValue').text(formatter.format(leg1Strike - averageCostOrCredit));
        $('#expirationDateDisplay .sectionValue').text(expirationDate);
        $('#currentPriceDisplay .sectionValue').text(`${formatter.format(currentPrice)}`);
        $('#averageCostOrCreditDisplay .sectionHeader').text($('#averageCostOrCreditDisplay .sectionHeader').text().replace('{COST_OR_CREDIT}', averageCostOrCredit < 0 ? 'CREDIT' : 'COST'));
        $('#averageCostOrCreditDisplay .sectionValue').text(`${formatter.format(averageCostOrCredit)}`);
        $('#todaysReturnDisplay .sectionValue').html(`<b>+${formatter.format(dollarReturn)}</b> (+${percentageReturn.toFixed(2)}%)`);
        $('#totalReturnDisplay .sectionValue').html(`<b>+${formatter.format(dollarReturn)}</b> (+${percentageReturn.toFixed(2)}%)`);
    });
});
