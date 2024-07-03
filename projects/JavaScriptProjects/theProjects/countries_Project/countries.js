const imgS = document.getElementById('flagImg');
const divP = document.getElementById('countryP');
const countryName = document.getElementById('inputName');

// Display the input in console.log + eventListener to check button
document.getElementById('btn4').addEventListener('click', async () => {
    const name = countryName.value;
    const theCountry = await getCountry(name);
    /* console.log(theCountry); */
    setCountry(theCountry);
    console.log("The input is = " + name);
});

// Get the country info from an API
async function getCountry(name) {
    const response = await fetch("https://restcountries.com/v3.1/name/" + name);
    let countryInfo = await response.json();
    return countryInfo[0];
};
console.log(typeof (getCountry("israel")));
console.log((getCountry("israel")));

// Post the information about the country in the left panel
async function setCountry(countryInfo) {
    divP.innerHTML = "";
    imgS.src = "";

    if (countryInfo) {
        let region = countryInfo.region;
        console.log("Region: " + region);
        divP.innerHTML += `<strong>Region:</strong> ${region}.<br><br>`;

        if (countryInfo.capital) {
            let capital = countryInfo.capital.join(", ");
            divP.innerHTML += `<b>Capital:</b> ${capital}.<br><br>`;
            console.log("Capital: " + capital);
        } else {
            divP.innerHTML += `<b>Capital:</b> None.<br><br>`;
        }

        let language = Object.values(countryInfo.languages).join(", ");
        divP.innerHTML += `<b>Language:</b> ${language}.<br><br>`;
        console.log("Language: " + language);

        let currency = Object.keys(countryInfo.currencies).join(", ");
        console.log(currency);
        let symbol = Object.values(countryInfo.currencies).map(currency => currency.symbol)
        console.log(symbol);
        divP.innerHTML += `<b>Currency:</b> ${currency} - ${symbol}.<br><br>`;
        console.log("Currency: " + currency);

        countryInfo.unMember ?
            divP.innerHTML += `${countryInfo.name.common} is a member of the UN.`
            :
            divP.innerHTML += `${countryInfo.name.common} is NOT a member of the UN.`;

        let flagImg = countryInfo.flags.png;
        let flag = countryInfo.flag
        console.log(flag);
        imgS.hidden = false;
        imgS.src = flagImg;
    }
};



// == Table section == 
// Request all countries.
async function onLoad() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    let countryInfo = await response.json();
    return countryInfo;
};
onLoad();

// Run a forEach and build the table after receiving the countries package.
async function fillTable() {
    let countries = await onLoad();
    let dataForTable = "";
    let tableBody = document.getElementById('tableDataBody');

    //Sort them
    countries.sort((a, b) => (a.name.common > b.name.common));
    // Post them in the table
    countries.forEach((country) => {
        let countryName = country.name.common;
        let countryRegion = country.region;

        let countryCapital;
        country.capital ? countryCapital = country.capital : countryCapital = "No Capital";

        let unMember;
        country.unMember ? unMember = 'Yes' : unMember = 'No';

        dataForTable += `
            <tr>
            <td>${countryName}</td>
            <td>${countryCapital}</td>
            <td>${countryRegion}</td>
            <td>${unMember}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = dataForTable;
}
fillTable();