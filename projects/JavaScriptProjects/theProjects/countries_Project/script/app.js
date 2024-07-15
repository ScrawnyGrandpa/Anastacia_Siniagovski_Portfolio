import CountryManager from "./manager.js";

const manager = new CountryManager();
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('resultDiv');
const selectedCountry = document.getElementById('selectedCountry');

input.addEventListener('input', () => {
    const value = input.value.replace(/\s+/g, ' ').trim();
    const countries = manager.search(value);
    const table = manager.getTable(countries, onTrClick);
    resultsDiv.innerHTML = "";
    resultsDiv.append(table);

});

async function onLoad() {
    await manager.fetchCountries();
    const table = manager.getTable(manager.countries, onTrClick);
    resultsDiv.append(table);
    console.log("hello");
}
onLoad();

function onTrClick(country) {
    selectedCountry.innerHTML = country.getHTML();
}