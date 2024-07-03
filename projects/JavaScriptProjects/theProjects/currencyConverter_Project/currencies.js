
async function getAllCurrencies() {
    let currencies = await fetch("https://v6.exchangerate-api.com/v6/c2d9efcf9ee85cbc2bd1259f/codes");
    let result = await currencies.json();
    let codes = result.supported_codes.map((item) => item[0]);
    return codes;
}
console.log(getAllCurrencies());

async function options() {
    let codes = await getAllCurrencies();
    let fromSelector = document.getElementById('from');
    let toSelector = document.getElementById('to');

    let newCodes = codes.map((code) => `<option>${code}</option>`);
    fromSelector.innerHTML = newCodes.join("");
    toSelector.innerHTML = newCodes.join("");
    console.log(newCodes);

}
options();

async function convert(amount, from, to) {
    let response = await fetch(`https://v6.exchangerate-api.com/v6/c2d9efcf9ee85cbc2bd1259f/latest/${from}`);
    let data = await response.json();
    let rate = data.conversion_rates[to];
    return rate * amount;
}

document.getElementById('convertBtn').addEventListener('click', async () => {
    let fromP = document.getElementById('from');
    let toP = document.getElementById('to');
    let from = fromP.value;
    let to = toP.value;
    let amountP = document.getElementById('amount');
    let amount = amountP.value;
    let result = document.getElementById('result')
    let finalRate = await convert(amount, from, to);
    return result.innerHTML = `${finalRate} ${to}`;
});