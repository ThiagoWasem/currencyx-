const apiKey = 'f15d82679bbbf4bb52276286'; 
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertButton = document.getElementById('convertButton');


const currencies = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'CAD', 'AUD'];

currencies.forEach(currency => {
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    
    option1.value = option2.value = currency;
    option1.text = option2.text = currency;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
});


fromCurrency.value = 'USD';
toCurrency.value = 'BRL';


async function convertCurrency() {
    let from = fromCurrency.value;
    let to = toCurrency.value;
    let amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || amountValue <= 0) {
        alert('Digite um valor válido para converter.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedValue = (amountValue * rate).toFixed(2);
        result.value = convertedValue;
    } catch (error) {
        alert('Erro ao buscar taxas de câmbio. Tente novamente mais tarde.');
    }
}

convertButton.addEventListener('click', convertCurrency);
