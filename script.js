const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const total = document.querySelector("#total");
const btnName = document.querySelector("#btn_addNewUser");
const list = document.querySelector("#list");


// fetches any existing data from local storage, displays in list
window.onload = fetchInfo()

function fetchInfo() {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched) {
        let data = JSON.parse(fetched[info]);

        dynamicGenerator(data);
    };
};



// resets input fields to blank after submitted
function clearInputs() {
    firstName.value = '';
    lastName.value = '';
    total.value = '';
};


// creates new items, appends to container, saves to local storage
function addDebtor() {
    const debtor = {
        Name: `${firstName.value} ${lastName.value}: $`,
        total: total.value,
        id: Date.now()
    };
    console.log(debtor)
    dynamicGenerator(debtor);
    dataStorage(debtor);
    clearInputs();
};


// generates dynamic html
function dynamicGenerator(data){
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const addBtn = document.createElement('button');
    const subBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const _p = document.createElement('p');
    
    addBtn.innerText = '+';
    subBtn.innerText = '-';
    delBtn.innerText = 'x';
    
    addBtn.setAttribute('id', data.id);
    addBtn.setAttribute('class', 'dynBtn');

    subBtn.setAttribute('id', data.id);
    subBtn.setAttribute('class', 'dynBtn');

    delBtn.setAttribute('id', data.id);
    delBtn.setAttribute('class', 'dynBtn');
    
    _p.setAttribute('id', data.id);

    
    div1.append(data.Name);
    div2.append(data.total);
    div3.append(div1, div2, addBtn, subBtn, delBtn);
    list.append(div3, _p);
};


// saves data to local storage
function dataStorage(data){
    let debtorString = JSON.stringify(data);
    localStorage.setItem(data.id, debtorString);
};


// removes data from local storage
function removeInfo(id) {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched) {
        let data = JSON.parse(fetched[info]);
        
        if(data.id == id) {
            localStorage.removeItem(data.id);
        };
    };
};


// validation for empty fields
function checkFields() {
    if(firstName.value === '' || lastName.value === '') {
        alert('Enter All Values');
        clearInputs();
    } else {
        addDebtor();
    };
};


// onclick to submit inputs
btnName.addEventListener('click', function(e) {
    e.preventDefault();
    checkFields();
});


// onclick controller for dynamic buttons
list.addEventListener('click', function(e) {
    e.preventDefault();
    const element = e.target;

    // if delete button is clicked
    if(element.innerText === 'x') {
        removeInfo(element.id);
        console.log(element.id)
        element.parentElement.remove();
    };

    // if add button is clicked
    if(element.innerText === '+') {
        addTotal(element, element.id);
    };

    // if sub button is clicked
    if(element.innerText === '-') {
        subTotal(element, element.id);
    };
});


// on add button click, prompts for additional amount, adds to existing total
function addTotal(data, dataId) {
    let dataLocale = data.parentElement.getElementsByTagName('div')[1];
    let addAmount = parseInt(prompt("Enter amount to ADD to existing total"));
    let newTotal = addAmount + parseInt(dataLocale.innerText);
    let updatedTotal = dataLocale.innerText = newTotal;
    updateAmounts(data, dataId, updatedTotal);
};


// on sub button click, prompts for subtraction amount, minus from existing total
function subTotal(data, dataId) {
    let dataLocale = data.parentElement.getElementsByTagName('div')[1];
    let subAmount = parseInt(prompt("Enter amount to SUBTRACT from existing total"));
    let newTotal = parseInt(dataLocale.innerText) - subAmount;
    let updatedTotal = dataLocale.innerText = newTotal;
    updateAmounts(data, dataId, updatedTotal);
};

// updates existing object, saves to local storage (works with add or sub buttons)
function updateAmounts(data, dataId, updatedTotal) {
    let updatedDebtor = {
        Name: data.parentElement.getElementsByTagName('div')[0].innerText,
        total: updatedTotal,
        id: dataId
    };
    dataStorage(updatedDebtor);
};