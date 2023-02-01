window.onload = runFunctionsOnLoad;

var myHeaders = new Headers();
myHeaders.append("apikey", "Mps2Uft1uEwEEsEsYFx61uNosm9tvjHG");

function get_currencies() {

    console.log('we are in js file')
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    return fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
        .then(response => {
            console.log('In first then');
            return response.json()
        })
        .then(result => {
            if (result.symbols) {
                return result.symbols
            }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


}

function addOptionsToSelect(selectElements) {


    get_currencies().then(result => {
        if (result) {
            console.log('Data recieved so now in creating');
            let currencies = result;
            // console.log(currencies);
            for (const selected_element of selectElements) {
                Object.keys(currencies || {}).forEach(element => {

                    const optionElement = document.createElement("option");
                    optionElement.value = element;
                    optionElement.textContent = currencies[element];
                    selected_element.appendChild(optionElement);
                });

            }

        }
        else {
            console.log('Error in data loading!!!');
        }

    });

    console.log('We are in creating element now');



}

function runFunctionsOnLoad() {

    // add option to select of base currency
    const base_selectElement = document.querySelector(".base-currency-select");
    const quote_selectElement = document.querySelector(".quote-currency-select");
    addOptionsToSelect([base_selectElement, quote_selectElement])



}

function submitExchange() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    console.log('We are in Submit function!!!');
    base_currency = document.getElementById("base_currency").value;
    quote_currency = document.getElementById("quote_currency");

    base_currency_option = document.getElementById("base_currency_option").value;
    quote_currency_option = document.getElementById("quote_currency_option").value;

    console.log(base_currency_option, base_currency);
    console.log(quote_currency_option)
    // console.log(quote_currency_option, quote_currency);

    fetch("https://api.apilayer.com/fixer/convert?to=" + quote_currency_option + "&from=" + base_currency_option + "&amount=" + base_currency, requestOptions)
        .then(response => { return response.json() })
        .then(result => {
            quote_currency.disabled = false;
            quote_currency.value = result.result
            quote_currency.disabled = true;
            console.log(result.result);
        })
        .catch(error => { alert('Error in communication with an API') });

}

function swapCurrency() {
    base_currency = document.getElementById("base_currency");
    quote_currency = document.getElementById("quote_currency");

    base_currency_option = document.getElementById("base_currency_option");
    quote_currency_option = document.getElementById("quote_currency_option");

    let temp_currency = base_currency.value
    base_currency.value = quote_currency.value
    quote_currency.disabled = false;
    quote_currency.value = temp_currency
    quote_currency.disabled = true;

    temp_currency = base_currency_option.value
    base_currency_option.value = quote_currency_option.value
    quote_currency_option.value = temp_currency


}


// Test change
// API KEY
// Mps2Uft1uEwEEsEsYFx61uNosm9tvjHG   WAQAS
// XTqi6KumotxKhVwLbxm2ue37edozpXdl  USMAN
// Documentation
// https://exchangeratesapi.io/documentation/
