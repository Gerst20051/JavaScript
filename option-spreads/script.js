const host = document.location.origin;
var availableDates = [], optionSpreads = [], optionSpreadIndex = null, expirations = [], selectedExpiration = '', spreadType = [], spreadListIndex = null;

$(document).ready(() => {
    $('#loadingDataHeaderContent, #loadingDataContent').show();
    loadAvailableDates();
});

$('#logo').on('click', () => {
    if ($('#availableDatesListContent').is(':visible')) {
        return;
    }
    if ($('#spreadDetailsListContent').is(':visible')) {
        $('#spreadDetailsListContent').hide();
        $('#spreadListContent').show();
        return;
    }
    if ($('#spreadListContent').is(':visible')) {
        $('#spreadListContent').hide();
        $('#spreadTypeListContent').show();
        return;
    }
    if ($('#spreadTypeListContent').is(':visible')) {
        $('#spreadTypeListContent').hide();
        $('#expirationListContent').show();
        return;
    }
    if ($('#expirationListContent').is(':visible')) {
        $('#expirationListContent').hide();
        $('#instrumentsListContent').show();
        return;
    }
    if ($('#instrumentsListContent').is(':visible')) {
        $('#instrumentsListContent').hide();
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
    $('#expirationListContent').show();
});

$('#expirationList').on('click', '.fullRow', function () {
    selectedExpiration = $(this).find('span').text();
    $('#expirationListContent').hide();
    $('#spreadTypeListContent').show();
});

$('#spreadTypeList').on('click', '.fullRow', function () {
    spreadType = $(this).find('span').text().split(' ');
    const spreads = optionSpreads[optionSpreadIndex].spreads[selectedExpiration][spreadType[0].toLowerCase()][spreadType[1].toLowerCase()];
    const rowItems = _.map(spreads, spread => {
        return [
            '<li class="clearfix">',
            `   <div class="fullRow ${spread.itm ? 'itm' : 'otm'}">`,
            '       <span><b>' + spread.description + '</b></span><br>',
            `       <span>${spread.itm ? 'ITM' : 'OTM'} ${spread.itm_percentage}%</span><br>`,
            '   </div>',
            '</li>'
        ].join('');
    });
    $('#spreadList').html(rowItems);
    $('#spreadTypeListContent').hide();
    $('#spreadListContent').show();
});

$('#spreadList').on('click', '.fullRow', function () {
    spreadListIndex = $(this).parent().index();
    const spread = optionSpreads[optionSpreadIndex].spreads[selectedExpiration][spreadType[0].toLowerCase()][spreadType[1].toLowerCase()][spreadListIndex];
    $('#spreadDetailsList').html([
        '<li class="clearfix">',
        '   <div class="fullRow">',
        '       <span>' + spread.type + '</span>',
        '   </div>',
        '</li>',
        '<li class="clearfix">',
        `   <div class="fullRow ${spread.itm ? 'itm' : 'otm'}">`,
        '       <span>' + spread.description + '</span>',
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
    $('#spreadDetailsListContent').show();
});
