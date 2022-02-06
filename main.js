let tipCalculationSteps = 0;
let billInput = document.getElementById('bill-amount');
let customerCountInput = document.getElementById('total-people')
let tipNode = document.getElementById('tip');
let billNode = document.getElementById('bill')

let tipCalculator = (()=>{
    function calculateTipAmount(totalBill, tipPercent){
        let tip = (tipPercent/100) * totalBill
        return tip
    }

    function tipPerPerson(numberOfPeople,totalBill,tipPercent){
        let totalTip = calculateTipAmount(totalBill,tipPercent)
        let tip = totalTip/numberOfPeople
        return tip
    }

    function totalBillPerPerson(totalBill, numberOfPeople,tipPercent){
        let tip = tipPerPerson(numberOfPeople,totalBill,tipPercent)
        let bill = tip + (totalBill/numberOfPeople)
        return bill
    }

    return {tipPerPerson,totalBillPerPerson}
})()


function getBill(){
    let bill = billInput.value
    return parseInt(bill)
}

function getNumberOfPeople(){
    let people = customerCountInput.value
    return parseInt(people)
}

function getTipPercent(element){
    return parseInt(element.textContent.split("%")[0])
  
}

function updateScreen(tip,bill){
    tipNode.textContent = "$"+tip
    billNode.textContent = "$"+bill
}

let tips = document.querySelector('.tip-percent-container')
let selectedTip;
let tipPercentage;
tips.addEventListener('click', (e)=>{
    if (selectedTip == null){
        
    }else{
        selectedTip.parentElement.classList.remove('selected-tip')
    }
    selectedTip = e.target
    e.target.parentElement.classList.add('selected-tip')
    tipPercentage = getTipPercent(selectedTip)

    if(billInput.value.length > 0 && tipPercentage > 0 && customerCountInput.value.length > 0){
        let tipPerPerson = tipCalculator.tipPerPerson(getNumberOfPeople(),getBill(), tipPercentage)
        let billPerPerson = tipCalculator.totalBillPerPerson(getBill(),getNumberOfPeople(),tipPercentage)
        updateScreen(tipPerPerson,billPerPerson)
    }
})

billInput.addEventListener('input',()=>{
    billInput.parentElement.style.borderColor = " hsl(172, 67%, 45%)"
    if (billInput.value.length <= 0){
        billInput.parentElement.style.borderColor = "transparent"
    }
})


customerCountInput.addEventListener('input',()=>{
    let errorMsg = document.querySelector('.error-msg')
    if (parseInt(customerCountInput.value) == 0){
        customerCountInput.parentElement.style.borderColor = "red"
        errorMsg.style.display = "block"
    }else {
        customerCountInput.parentElement.style.borderColor = "transparent"
        errorMsg.style.display = "none"
    }
   
    if(billInput.value.length > 0 && tipPercentage > 0 && customerCountInput.value.length > 0){
        let tipPerPerson = tipCalculator.tipPerPerson(getNumberOfPeople(),getBill(), tipPercentage)
        let billPerPerson = tipCalculator.totalBillPerPerson(getBill(),getNumberOfPeople(),tipPercentage)
        updateScreen(tipPerPerson,billPerPerson)
    }
})

document.getElementById("reset").addEventListener('click',()=>{
        customerCountInput.value = ""
        billInput.value = ""
        billInput.parentElement.style.borderColor ="transparent"
        tipNode.textContent ="$0.00"
        billNode.textContent = "$0.00"
        selectedTip.parentElement.classList.remove('selected-tip')
})







