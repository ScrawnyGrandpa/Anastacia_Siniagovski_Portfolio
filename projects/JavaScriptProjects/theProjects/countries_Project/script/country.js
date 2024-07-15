export default class Country {
    data;

    get name() {
        return this.data.name.common;
    }

    get altNames() {
        return this.data.altSpellings || [];
    }
    get capitals() {
        return this.data.capital || [];
    }
    get languages() {
        return Object.values(this.data.languages || {});
    }
    get population() {
        return this.data.population;
    }
    get currencies() {
        return Object.keys(this.data.currencies || {}).map(id => ({
            id: id,
            name: this.data.currencies[id].name,
            symbol: this.data.currencies[id].symbol
        }));
    }

    get unMember() {
        return this.data.unMember;
    }

    get region() {
        return this.data.region;
    }

    get flag() {
        return {
            src: this.data.flags.png,
            alt: this.data.flags.alt
        };
    }

    constructor(data) {
        this.data = data;
    }

    getHTML() {
        return /* html */`
        <b>Name:</b> ${this.name}.<br><br>
        <b>Alt Names:</b> <ul>${this.altNames.map(altName => /* html */`<li>${altName}</li>`).join("")}</ul> <br><br>
        <b>Region:</b> ${this.region}.<br><br>
        <b>Capital(s):</b> ${this.capitals.join(", ") || "No Capital"}. <br><br>
        <b>Language(s):</b> <ul> ${this.languages.map(language => /* html */`<li>${language}</li>`).join("")}</ul> <br><br>
        <b>Population:</b> ${this.population.toLocaleString()}. <br><br>
        <b>Currency:</b> ${this.currencies.map(curr => `${curr.id} (${curr.symbol})`).join(", ")}. <br><br>
        <b>UN Membership:</b> ${this.name} is ${this.unMember ? "a UN member." : " not a UN member."}<br>
        <img src="${this.flag.src}"/>
        `
    }

    getTableRow(onClick) {
        const tr = document.createElement('tr');
        tr.innerHTML = /* html */
            `
        <td>${this.name}</td>
        <td>${this.region}</td>
        <td>${this.capitals.join(", ") || " - "}</td>
        <td>${this.languages.join(", ") || " - "}</td>
            `;
        tr.onclick = () => onClick(this);
        return tr;
    }
}
