// window.onload = runFunctionsOnLoad;

function get_currencies() {

    console.log('we are in js file')

    var myHeaders = new Headers();
    myHeaders.append("apikey", "Mps2Uft1uEwEEsEsYFx61uNosm9tvjHG");

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


}

// API KEY
// Mps2Uft1uEwEEsEsYFx61uNosm9tvjHG

// Documentation
// https://exchangeratesapi.io/documentation/
