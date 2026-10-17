
const status={
    state:"start",
    FND:false,
    SND:false,

}

const numberBtns = document.querySelectorAll(".Number");
const operatorBtns = document.querySelectorAll(".operator")
const equalbtn =document.querySelector("#eq");
const clearBtn = document.querySelector("#clear")
const decimalBtn = document.querySelector('#point');
const backspaceBtn =document.querySelector("#back");
const displayScreen = document.querySelector("#display");

// button events
numberBtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=> {
        numberClick(e.target.innerHTML);

    })
})
operatorBtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        operatorClick(e.target.innerHTML)
    })
})
equalbtn.addEventListener('click',equalsClick);
clearBtn.addEventListener('click',clearClick);
backspaceBtn.addEventListener('click',backspaceClick);
decimalBtn.addEventListener('click',decimalClick);
document.addEventListener('keydown',(e)=>{
    keyboardClick(e.key);
})

// functions
function createDiv(divId){
    const newDiv = document.createElement('div');
    newDiv.classList.add("display-div");
    newDiv.id=divId;
    displayScreen.appendChild(newDiv);

}
function addContent(content,divId){
    const newContent = document.createTextNode(content);
    const parentDiv = document.getElementById(divId);
    parentDiv.appendChild(newContent);

}
function restartDecimalState(){
    status.FND=false;
    status.SND=false;

}
function numberClick(num){
    if(status.state==="start"){
        removeStartDisplay()
        createDiv("first-num");
        addContent(num,"first-num");
        status.state = "FN-input";
    }
    else if(status.state==="FN-input"){
        addContent(num,"first-num")
    }
    else if(status.state==="OP-input"){
        createDiv("second-num");
        addContent(num,"second-num");
        status.state="SN-input";
    }
    else if(status.state==="SN-input"){
        addContent(num,"second-num");
    }
    else if (status.state==="results-display"){
        clearDisplay();
        createDiv("first-num");
        addContent(num,"first-num");
        status.state = "FN-input";

    }
}
function setOperator(opp){
    const parentDiv = document.getElementById("mid-operator");
    parentDiv.textContent=opp;

}
function operatorClick(opp){
    if(status.state==="FN-input"){
        createDiv("mid-operator");
        setOperator(opp);
        status.state="OP-input";

    }else if(status.state==="OP-input"){
        setOperator(opp);
    }
    else if (status.state==="results-display"){
        const results = document.getElementById('results');
        results.id="first-num";
        status.state='FN-input';
        operatorClick(opp);


    }
}

function equalsClick(){
    if(status.state==='SN-input') {
        let firstNumber = Number(document.getElementById("first-num").textContent);
        let secondNumber = Number(document.getElementById("second-num").textContent);
        let operator = document.getElementById("mid-operator").textContent;
        operate(firstNumber, operator, secondNumber);
    }

}
function operate(fn,o,sn){
    switch (o){
        case "+":
            displayResults(fn+sn);
            break;
        case "x":
            displayResults(fn*sn);
            break;
        case "-":
            displayResults(fn-sn);
            break;
        case "/":
            if(sn===0){
                divideByZero();
            }
            else{
                displayResults(fn/sn);}
            break;

    }
}
function displayResults(result){
    clearDisplay();
    createDiv("results");
    addContent(+(result).toFixed(3),"results");
    status.state="results-display"
    restartDecimalState();

}
function clearDisplay(){
    while(displayScreen.hasChildNodes()){
        displayScreen.removeChild(displayScreen.firstChild)
    }

}
function clearClick(){
    clearDisplay();
    status.state="start";
    restartDecimalState();
    startDisplay();
}
function backspaceClick(){
    if(status.state==="FN-input"){
        const div = document.getElementById('first-num');
        if(div.childNodes.length===1){
            displayScreen.removeChild(div);
            status.state='start';
        }
        else if(div.childNodes.length>1){
            if(div.lastChild.textContent ==="."){
                status.FND=false;
            }
            div.removeChild(div.lastChild);
        }
    }
    else if (status.state==="SN-input"){
        const div = document.getElementById('second-num');
        if(div.childNodes.length===1){
            displayScreen.removeChild(div);
            status.state='OP-input';

        }
        else if(div.childNodes.length>1){
            if(div.lastChild.textContent==="."){
                status.SND=false;
            }
            div.removeChild(div.lastChild);
        }

    }
    else if (status.state==="OP-input"){
        const div = document.getElementById('mid-operator');
        displayScreen.removeChild(div);
        status.state='FN-input';
    }

}
function decimalClick(){

    if(status.state==="FN-input"&& status.FND===false){
        addContent(".","first-num");
        status.FND=true;

    }
    else if(status.state==="SN-input" && status.SND===false){
        addContent(".","second-num");
        status.SND=true;

    }
}
function keyboardClick(key){
    const operators = ["-","+","/","x"]
    if(key===" "){
    }

    else if(!isNaN(key)){

        numberClick(key);
    }
    else if (operators.includes(key)){
        operatorClick(key);
    }
    else if(key==="."){
        decimalClick();
    }
    else if(key==='Backspace'){
        backspaceClick();
    }
    else if(key==='Enter'|| key==="="){
        equalsClick();
    }


}
function startDisplay(){
    const startdisplay = document.createElement('div')
    startdisplay.classList.add("display-div")
    startdisplay.id='start-div';
    startdisplay.textContent="0";
    displayScreen.appendChild(startdisplay);
}
function removeStartDisplay(){
    const start = document.getElementById('start-div');
    displayScreen.removeChild(start);
}
function divideByZero(){
    clearDisplay();
    const div = document.createElement('div')
    div.classList.add("display-div")
    div.id='start-div';
    div.textContent="Bro =_=";
    displayScreen.appendChild(div);
    status.state="start";


}
startDisplay();
