const displayContent={
    firstNum:null,
    midoperator:null,
    secondNum:null,
    result:null,
}
const numberBtns = document.querySelectorAll(".Number");
const operatorBtns = document.querySelectorAll(".operator")
const equalbtn =document.querySelector("#eq");
const clearBtn = document.querySelector("#clear")

// button events
clearBtn.addEventListener("click",()=>{
    clearDisplay();
    displayContent.result=null;
    displayContent.firstNum=null;
    displayContent.secondNum=null;
    displayContent.midoperator=null;
})


equalbtn.addEventListener('click',operate);

numberBtns.forEach((btn)=>{
        btn.addEventListener('click',(e)=> {
                if(numberChecker(e.target.innerHTML)) {
                    addToDisplay(e.target.innerHTML)
                }

            }
        )

    }
)

operatorBtns.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
                if(operatorChecker(e.target.innerHTML)){
                    addToDisplay(e.target.innerHTML)}
            }
        )

    }
)

//functions

function addToDisplay(content){
    const displayScreen = document.querySelector("#display");
    const newDiv = document.createElement("div")
    newDiv.id="added-div";
    newDiv.textContent=content;
    displayScreen.appendChild(newDiv);

}
function displayResults(content){
    clearDisplay();
    const displayScreen = document.querySelector("#display");
    const newDiv = document.createElement("div")
    newDiv.id="added-div";
    newDiv.textContent=content;
    displayScreen.appendChild(newDiv);

}
function clearDisplay(){
    const displayScreen = document.querySelector("#display");
    while(displayScreen.hasChildNodes()){
        displayScreen.removeChild(displayScreen.firstChild)
    }

}



function numberChecker(num){
    if (displayContent.midoperator==null&& displayContent.firstNum!=null){
        displayContent.firstNum = `${displayContent.firstNum}${num}`
        return true
    }
    else if(displayContent.firstNum==null&& displayContent.result==null){
        displayContent.firstNum=num;
        return true
    }
    else if (displayContent.midoperator!=null && displayContent.secondNum!=null){
        displayContent.secondNum = `${displayContent.secondNum}${num}`
        console.log(displayContent.secondNum);
        return true

    }
    else if (displayContent.midoperator!=null && displayContent.secondNum==null){
        displayContent.secondNum = num;

        return true

    }



}
function operatorChecker(opp){
    if (displayContent.midoperator==null&& displayContent.firstNum!=null){
        displayContent.midoperator=opp
        console.log(displayContent.firstNum)
        return true
    }

}
function operate(){
    let x = Number(displayContent.firstNum);
    let y = Number(displayContent.secondNum);
    switch (displayContent.midoperator){
        case "+":
            displayContent.result=x+y;
            displayResults(displayContent.result);
            break;
        case "x":
            displayContent.result=x*y;
            displayResults(displayContent.result);
            break;
        case "-":
            displayContent.result=x-y;
            displayResults(displayContent.result);
            break;
        case "/":
            displayContent.result=x/y;
            displayResults(displayContent.result);
            break;

    }

}