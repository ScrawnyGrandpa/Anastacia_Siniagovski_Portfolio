import Country from './country.js'

export default class CountryManager {
    countries = [];

    async fetchCountries() {
        let result = await fetch("https://restcountries.com/v3.1/all");
        let data = await result.json();
        this.countries = data.map(country => new Country(country)).sort((a, b) => a.name > b.name);
    }

    getTable(countries, onClick) {
        const table = document.createElement("table");
        table.innerHTML = /* html */`
        <thead>
            <tr>
                <th>Name</th>
                <th>Region</th>
                <th>Capital</th>
                <th>Language</th>
            </tr>
        </thead>`

        const tbody = document.createElement("tbody");
        tbody.append(...countries.map(country => country.getTableRow(onClick)));
        table.append(tbody);
        return table;
    }

    search(input) {
        if (!input) {
            return this.countries;
        }

        input = input.toLowerCase();

        /* Check if input.length is bigger than 1 at least. */
        const sResult = this.countries.filter((country) =>
            country.name.toLowerCase().includes(input) ||
            country.altNames.some(altName => altName.toLowerCase().includes(input))
        );
        return sResult;
    }
}
