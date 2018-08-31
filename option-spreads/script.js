const isLocal = false;
const host = isLocal ? 'http://127.0.0.1' : document.location.origin;

var availableDates = [],
    optionSpreads = [],
    optionSpreadIndex = null,
    expirations = [],
    selectedExpiration = '',
    spreadType = [],
    spreadListIndex = null;

$(document).ready(() => {
    $('#loadingDataHeaderContent, #loadingDataContent').show();
    loadAvailableDates();
});

$('#logo').on('click', () => {
    if ($('#availableDatesListContent').is(':visible')) {
        return;
    }
    if ($('#spreadDetailsListContent').is(':visible')) {
        $('#spreadDetailsListContent').hide()
        $('#spreadDetailsList').empty();
        $('#spreadListContent').show();
        return;
    }
    if ($('#spreadListContent').is(':visible')) {
        $('#spreadListContent,#noAvailableSpreads').hide()
        $('#spreadList').empty();
        $('#spreadTypeListContent').show();
        return;
    }
    if ($('#spreadTypeListContent').is(':visible')) {
        $('#spreadTypeListContent').hide();
        $('#expirationListContent').show();
        return;
    }
    if ($('#expirationListContent').is(':visible')) {
        $('#expirationListContent').hide()
        $('#expirationList').empty();
        $('#instrumentsListContent').show();
        return;
    }
    if ($('#instrumentsListContent').is(':visible')) {
        $('#instrumentsListContent').hide()
        $('#instrumentsList').empty();
        $('#availableDatesListContent').show();
        return;
    }
});

$('#reload').on('click', () => {
    $('#loadedDataHeaderContent, #loadedDataContent').hide();
    $('#loadingDataHeaderContent, #loadingDataContent').show();
    availableDates = [];
    optionSpreads = [];
    optionSpreadIndex = null;
    expirations = [];
    selectedExpiration = '';
    spreadType = [];
    spreadListIndex = null;
    $('#availableDatesListContent, #instrumentsListContent, #expirationListContent').hide();
    $('#availableDatesList, #instrumentsList, #expirationList').empty();
    generateOptionSpreads().then(() => {
        loadAvailableDates();
        $('#loadingDataHeaderContent, #loadingDataContent').hide();
        $('#loadedDataHeaderContent, #loadedDataContent').show();
    });
});

function generateOptionSpreads() {
    return new Promise((resolve, reject) => {
        $.getJSON(`${host}:8005/option-chains?dont_return_data`).done(resolve).fail(reject);
    });
}

function loadAvailableDates() {
    $.getJSON(`${host}:8005/option-spreads-list`).done(data => {
        availableDates = data;
        $('#noAvailableDates').toggle(!availableDates.length);
        $('#availableDatesListContent').toggle(!!availableDates.length);
        if (availableDates.length) {
            const rowItems = _.map(availableDates, availableDate => {
                return [
                    '<li class="clearfix">',
                    '   <div class="fullRow">',
                    '       <span>' + availableDate + '</span>',
                    '   </div>',
                    '</li>'
                ].join('');
            });
            $('#availableDatesList').html(rowItems);
        }
        $('#loadingDataHeaderContent, #loadingDataContent').hide();
        $('#loadedDataHeaderContent, #loadedDataContent').show();
    });
}

function loadOptionSpreads(date) {
    $('#loadedDataHeaderContent, #loadedDataContent').hide();
    $('#loadingDataHeaderContent, #loadingDataContent').show();
    $.getJSON(`${host}:8005/option-spreads?date=${date}`).done(data => {
        optionSpreads = data;
        const rowItems = _.map(optionSpreads, instrument => {
            return [
                '<li class="clearfix">',
                '   <div class="fullRow">',
                '       <span>' + instrument.symbol + '</span>',
                '   </div>',
                '</li>'
            ].join('');
        });
        $('#instrumentsList').html(rowItems);
        $('#availableDatesListContent').hide();
        $('#instrumentsListContent').show();
        $('#loadingDataHeaderContent, #loadingDataContent').hide();
        window.scrollTo(0, 0);
        $('#loadedDataHeaderContent, #loadedDataContent').show();
    });
}

$('#availableDatesList').on('click', '.fullRow', function () {
    loadOptionSpreads($(this).find('span').text());
});

$('#instrumentsList').on('click', '.fullRow', function () {
    optionSpreadIndex = $(this).parent().index();
    expirations = Object.keys(optionSpreads[optionSpreadIndex].spreads);
    const rowItems = _.map(expirations, expiration => {
        return [
            '<li class="clearfix">',
            '   <div class="fullRow">',
            '       <span>' + expiration + '</span>',
            '   </div>',
            '</li>'
        ].join('');
    });
    $('#expirationList').html(rowItems);
    $('#instrumentsListContent').hide();
    window.scrollTo(0, 0);
    $('#expirationListContent').show();
});

$('#expirationList').on('click', '.fullRow', function () {
    selectedExpiration = $(this).find('span').text();
    const callCreditSpreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration]['call']['credit'];
    const callCreditSpreadsItm = callCreditSpreads.filter(spread => spread.itm);
    const callDebitSpreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration]['call']['debit'];
    const callDebitSpreadsItm = callDebitSpreads.filter(spread => spread.itm);
    const putCreditSpreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration]['put']['credit'];
    const putCreditSpreadsItm = putCreditSpreads.filter(spread => spread.itm);
    const putDebitSpreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration]['put']['debit'];
    const putDebitSpreadsItm = putDebitSpreads.filter(spread => spread.itm);
    const callCreditSpreadsDescription = callCreditSpreads.length ? `${callCreditSpreadsItm.length} ITM / ${callCreditSpreads.length - callCreditSpreadsItm.length} OTM` : 'None Available';
    const callDebitSpreadsDescription = callDebitSpreads.length ? `${callDebitSpreadsItm.length} ITM / ${callDebitSpreads.length - callDebitSpreadsItm.length} OTM` : 'None Available';
    const putCreditSpreadsDescription = putCreditSpreads.length ? `${putCreditSpreadsItm.length} ITM / ${putCreditSpreads.length - putCreditSpreadsItm.length} OTM` : 'None Available';
    const putDebitSpreadsDescription = putDebitSpreads.length ? `${putDebitSpreadsItm.length} ITM / ${putDebitSpreads.length - putDebitSpreadsItm.length} OTM` : 'None Available';
    $('#spreadTypeList').html(`
        <li class="clearfix">
            <div class="fullRow">
                <span><b>Call Credit Spreads</b></span><br>
                <span>${callCreditSpreadsDescription}</span>
            </div>
        </li>
        <li class="clearfix">
            <div class="fullRow">
                <span><b>Call Debit Spreads</b></span><br>
                <span>${callDebitSpreadsDescription}</span>
            </div>
        </li>
        <li class="clearfix">
            <div class="fullRow">
                <span><b>Put Credit Spreads</b></span><br>
                <span>${putCreditSpreadsDescription}</span>
            </div>
        </li>
        <li class="clearfix">
            <div class="fullRow">
                <span><b>Put Debit Spreads</b></span><br>
                <span>${putDebitSpreadsDescription}</span>
            </div>
        </li>
    `);
    $('#expirationListContent').hide();
    window.scrollTo(0, 0);
    $('#spreadTypeListContent').show();
});

$('#spreadTypeList').on('click', '.fullRow', function () {
    spreadType = $(this).find('span').text().split(' ');
    const spreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration][spreadType[0].toLowerCase()][spreadType[1].toLowerCase()];
    $('#noAvailableSpreads').toggle(!spreads.length);
    const rowItems = _.map(spreads, spread => {
        return [
            '<li class="clearfix">',
            `   <div class="fullRow ${spread.itm ? 'itm' : 'otm'}">`,
            '       <span><b>' + spread.name + '</b></span><br>',
            '       <span>Mark Price: ' + spread.mark_price_details.description + '</span><br>',
            '       <span>Market Price: ' + spread.market_price_details.description + '</span><br>',
            '       <span>' + spread.market_price_details.max_contracts_at_market.description + '</span><br>',
            '       <span>' + spread.market_price_details.max_contracts_at_market.description2 + '</span><br>',
            `       <span><b>${spread.itm ? 'ITM' : 'OTM'} ${spread.itm_percentage}%</b></span><br>`,
            '   </div>',
            '</li>'
        ].join('');
    });
    $('#spreadList').html(rowItems);
    $('#spreadTypeListContent').hide();
    window.scrollTo(0, 0);
    $('#spreadListContent').show();
});

$('#spreadList').on('click', '.fullRow', function () {
    spreadListIndex = $(this).parent().index();
    const spread = optionSpreads[optionSpreadIndex].spreads[selectedExpiration][spreadType[0].toLowerCase()][spreadType[1].toLowerCase()][spreadListIndex];
    $('#spreadDetailsList').html([
        '<li class="clearfix">',
        '   <div class="fullRow">',
        `       <span>${optionSpreads[optionSpreadIndex].symbol} @ ${optionSpreads[optionSpreadIndex].quote.last_trade_price}</span>`,
        '   </div>',
        '</li>',
        '<li class="clearfix">',
        `   <div class="fullRow ${spread.itm ? 'itm' : 'otm'}">`,
        '       <span>' + spread.name + '</span>',
        '   </div>',
        '</li>',
        '<li class="clearfix">',
        '   <div>',
        '       <pre>' + JSON.stringify(spread.legs.long, null, 4) + '</pre>',
        '   </div>',
        '</li>',
        '<li class="clearfix">',
        '   <div>',
        '       <pre>' + JSON.stringify(spread.legs.short, null, 4) + '</pre>',
        '   </div>',
        '</li>'
    ].join(''));
    $('#spreadListContent').hide();
    window.scrollTo(0, 0);
    $('#spreadDetailsListContent').show();
});
