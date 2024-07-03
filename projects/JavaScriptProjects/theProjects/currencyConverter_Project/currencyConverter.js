console.log("Starting at 09:17 a.m.");

// Exrcise A


async function getCountry(name) {
    const result = await fetch("https://restcountries.com/v3.1/name/" + name)
    let country = await result.json();
    console.log(country);
}

async function getCapital(name) {
    let country = await getCountry(name);
    let capital = country[0].capital;
    return capital;
};

console.log(getCapital("Israel"));


