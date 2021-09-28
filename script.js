const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const total = document.querySelector("#total");
const btnName = document.querySelector("#btnName");
const list = document.querySelector("#list");
const totalList = document.querySelector("#totallist");

// fetches any existing data from local storage, displays in list
window.onload = fetchInfo()

function fetchInfo() {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched){
        let data = JSON.parse(fetched[info]);

        dynamicGenerator(data);
    }
};



// resets input fields to blank after submitted
function clearInputs() {
    firstName.value = '';
    lastName.value = '';
    total.value = '';
};


// creates new items, appends to container, saves to local storage
function addDebtor() {
    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        total: total.value,
        id: Date.now()
    };
    
    dynamicGenerator(data);
    dataStorage(data);
    clearInputs();
};


// generates dynamic html
function dynamicGenerator(data){
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const addBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    
    addBtn.innerText = '+';
    delBtn.innerText = 'x';
    
    addBtn.setAttribute('id', `${data.id}`);
    delBtn.setAttribute('id', `${data.id}`);
    
    div.append(`${data.firstName}  ${data.lastName} - $`);
    div2.append(`${data.total}`);
    div2.append(addBtn);
    div2.append(delBtn);
    list.append(div, div2);
};


// saves data to local storage
function dataStorage(debtor){
    let debtorString = JSON.stringify(debtor);
    console.log(debtor)
    localStorage.setItem(debtor.id, debtorString);
};


// removes data from local storage
function removeInfo(id) {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched){
        let data = JSON.parse(fetched[info]);
        
        if(data.id === parseInt(id)){
            localStorage.removeItem(data.id);
        };
    }
};


// validation for empty fields
function checkFields() {
    if(firstName.value === '' || lastName.value === '') {
        alert('Enter All Values');
        clearInputs();
    } else {
        addDebtor();
    }
};


// onclick to submit inputs
btnName.addEventListener('click', function(e) {
    e.preventDefault();
    checkFields();
});


// onclick to delete items (reworking to add edit btn)
list.addEventListener('click', function(e) {
    e.preventDefault();
    const element = e.target;

    if(element.innerText === 'x') {
        removeInfo(element.id);
        element.parentElement.remove();
    }
    if(element.innerText === '+') {
        let id = element.id;
        let element2 = element.parentElement;
        let existingTotal = element.parentElement.innerText;
        let addAmount = prompt("Enter amount to ADD to existing total");
        let newTotal = parseInt(addAmount) + parseInt(existingTotal);
        updatedTotal(element2, newTotal);
        console.log(element.id)
        return
    }
});

function updatedTotal(element2, newAmount) {
    console.log(element2);
    console.log(newAmount);
    element2.innerText = newAmount;
}