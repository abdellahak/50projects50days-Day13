let textarea = document.getElementById('choices');
let resultContainer = document.getElementById('resultContainer');
let pickBtn = document.getElementById('pickbtn');
let resultmessage = document.getElementById('resultmessage');
let message = "";

setChoices();

function getChoices() {
    return textarea.value.split(',').map(element => element.trim()).filter(Boolean);
}

function setChoices() {
    let data = getChoices();
    let dataHtml = data.map(element => `<div>${element}</div>`).join('');
    resultContainer.innerHTML = data == "" ? "choices will be shown here": dataHtml;
    resultmessage.innerHTML=""
}

textarea.addEventListener('input', setChoices);

function getRandomNumber(length) {
    return Math.floor(Math.random() * length);
}

pickBtn.addEventListener('click', () => {
    let choices = Array.from(resultContainer.children);
    choices.forEach(item=>{
        item.style.backgroundColor = "#FEF2DA";
    })
    let numChoices = choices.length;

    if (textarea.value.trim() && numChoices > 1) {
        let lastNum;
        let num;

        let highlightChoice = () => {
            if (lastNum !== num) {
                if (lastNum !== undefined) {
                    choices[lastNum].style.backgroundColor = "#FEF2DA";
                }
                lastNum = num;
                choices[num].style.backgroundColor = "#3498db";
            }
        };

        let operation = setInterval(() => {
            num = getRandomNumber(numChoices);
            highlightChoice();
        }, 200);

        setTimeout(() => {
            clearInterval(operation);
            choices[num].style.backgroundColor = "#3498db";
            message = `the winner is <span id="target">${choices[num].innerText}</span>`;
            resultmessage.innerHTML=message;
        }, 5000);
    }
});
