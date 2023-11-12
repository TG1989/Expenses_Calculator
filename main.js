const expensesInput = document.querySelector('#expenses-input')
const priceInput = document.querySelector("#price-input")
const addBtn = document.querySelector(".add-btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const nameInput = document.querySelector("#name-input")
const statusCheck = document.getElementById('status-input')
const selectFilter = document.getElementById('selection')




const userName = localStorage.getItem('name')

nameInput.value = userName

nameInput.addEventListener('change', (e) => {

    localStorage.setItem('name', e.target.value)
})

addBtn.addEventListener('click', addExpense);
list.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter)



let total = 0




function updateTotal(priceInfo) {
    total += Number(priceInfo);


    if (priceInfo >= 0) {
        totalInfo.innerText = total;
    } else {

        totalInfo.innerText = Math.max(total, 0);
    }
}

function addExpense(e) {
    e.preventDefault()

    if (!expensesInput.value || !priceInput.value) {
        alert(' :( Please fill in the empty inputs!')

    } else {
        const expensesDiv = document.createElement('div')
        expensesDiv.classList.add('expenses')

        if (statusCheck.checked) {
            expensesDiv.classList.add('paid')
        }

        expensesDiv.innerHTML = `
        
        <h2>${expensesInput.value}</h2>
        <h2 id = 'value'>${priceInput.value} $</h2>
    
        <div class="buttons">
            <img id='payment' src="./img/money-pay.png" alt="">
            <img id='remove' src="./img/dustbin.png" alt="">
        </div>
            
        `
        list.appendChild(expensesDiv)

        updateTotal(priceInput.value)
    }


    expensesInput.value = ''
    priceInput.value = ''
}



function handleClick(e) {
    let clickedElement = e.target;

    if (clickedElement.id === "remove") {
        const inclusiveElement = clickedElement.parentElement.parentElement;
        const deletedPriceString = inclusiveElement.querySelector('#value').innerText;

        const deletedPrice = Number(deletedPriceString.replace('$', ''));

        updateTotal(-deletedPrice);
        inclusiveElement.remove();
    }
}


function handleFilter(e) {

    const items = list.childNodes

    const filterValue = e.target.value

    items.forEach((item) => {
        switch (filterValue) {
            case "all":
                item.style.display = "flex";
                break;

            case "paid":
                if (!item.classList.contains("paid")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break

            case "unpaid":
                if(item.classList.contains("paid")){
                    item.style.display = "none"
                }else{
                    item.style.display="flex"
                }    

                break;

         

        }
    }
    )




}



