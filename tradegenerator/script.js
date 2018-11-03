
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

$(document).ready(() => {
    $('#displayTrade').click(() => {
        // TODO: Validate Inputs

        $('#infoEntry, #positionDisplay').toggle();

        const ticker = $('#ticker').val().toUpperCase();
        const numberOfContracts = $('#numberOfContracts').val();
        const expirationDate = '11/9'; // TODO: Get From Input?
        const typeCallsOrPuts = $('input[name="type-calls-or-puts"]:checked').val();
        const leg1Strike = $('#leg1Strike').val();
        const leg1StrikeType = $('input[name="leg-1-buy-or-sell"]:checked').val();
        const leg2Strike = $('#leg2Strike').val();
        const leg2StrikeType = $('input[name="leg-2-buy-or-sell"]:checked').val();
        const averageCostOrCredit = $('#averageCostOrCredit').val();
        const currentPrice = $('#currentPrice').val();

        const nextFridayDate = nextFriday();
        const dollarReturn = numberOfContracts * (currentPrice - averageCostOrCredit) * 100;
        const percentageReturn = (dollarReturn / (numberOfContracts * averageCostOrCredit * 100)) * 100;

        // TODO: Handle Singular / Plural (Call vs. Calls) (Put vs. Puts) Plural When Is A Spread / Has Leg 2
        $('#optionName .sectionValue').text(`${ticker} $${leg1Strike} ${capitalize(typeCallsOrPuts)}`);
        $('#numberOfContracts .sectionValue').text(`+${numberOfContracts}`); // TODO: Number Of Contracts Could Be Negative?
        $('#equity .sectionValue').text(formatter.format(numberOfContracts * currentPrice * 100));
        $('#breakEvenPrice .sectionHeader').text($('#breakEvenPrice .sectionHeader').text().replace('{TICKER}', ticker));
        $('#breakEvenPrice .sectionValue').text(formatter.format(leg1Strike - averageCostOrCredit));
        $('#expirationDate .sectionValue').text((nextFridayDate.getMonth() + 1) + '/' + nextFridayDate.getDate());
        $('#currentPrice .sectionValue').text(`${formatter.format(currentPrice)}`);
        $('#averageCostOrCredit .sectionValue').text(`${formatter.format(averageCostOrCredit)}`);
        $('#todaysReturn .sectionValue').text(`${formatter.format(dollarReturn)} (+${percentageReturn.toFixed(2)}%)`);
        $('#totalReturn .sectionValue').text(`${formatter.format(dollarReturn)} (+${percentageReturn.toFixed(2)}%)`);
    });
});
