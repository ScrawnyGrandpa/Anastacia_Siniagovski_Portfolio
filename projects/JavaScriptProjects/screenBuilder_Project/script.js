const addElementBtn = document.getElementById('addElementBtn');
const colorInput = document.getElementById('colorInput');
const rightPanel = document.getElementById('rightPanel');
const elementType = document.getElementById('elementType');
const elementWidth = document.getElementById('elementWidth');
const elementHeight = document.getElementById('elementHeight');
const elementMargin = document.getElementById('elementMargin');
const elementPadding = document.getElementById('elementPadding');
const contentColor = document.getElementById('contentColor');
const elementContent = document.getElementById('elementContent');
const contentFont = document.getElementById('contentFont');
const contentFontSize = document.getElementById('contentFontSize');
const resetInputsBtn = document.getElementById('resetInputsBtn');
const saveInputsBtn = document.getElementById('saveInputsBtn');
const refreshBtn = document.getElementById('refreshBtn');

addElementBtn.addEventListener('click', () => {
    /*  let newUserElement = document.createElement("div");

    // First option
    if (elementType.value === "") {
        newUserElement = document.createElement("div");
    } else {
        newUserElement = document.createElement(elementType.value);
    }

    // Second option
    elementType.value === "" ? newUserElement = document.createElement("div") : newUserElement = document.createElement(elementType.value); */

    // Third option 
    let newUserElement = document.createElement(elementType.value == '' ? "div" : elementType.value);
    newUserElement.style.width = elementWidth.value == '' ? '200px' : elementWidth.value + 'px';
    newUserElement.style.height = elementHeight.value == '' ? 'auto' : elementHeight.value + 'px';

    newUserElement.style.margin = elementMargin.value + 'px';
    newUserElement.style.padding = elementPadding.value + 'px';
    newUserElement.style.fontFamily = contentFont.value;
    newUserElement.style.fontSize = contentFontSize.value + 'rem';
    newUserElement.innerHTML = elementContent.value;
    newUserElement.style.color = contentColor.value;
    newUserElement.style.backgroundColor = colorInput.value;
    rightPanel.appendChild(newUserElement);

});

resetInputsBtn.addEventListener('click', () => {
    elementType.value = " ";
    elementWidth.value = " ";
    elementHeight.value = " ";
    contentColor.value = " ";
    elementContent.value = " ";
    contentFont.value = " ";
    contentFontSize.value = " ";
    colorInput.value = " ";
});

saveInputsBtn.addEventListener('click', () => { });

refreshBtn.addEventListener('click', () => {
    location.reload()
});