const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const total = document.querySelector("#total");
const btnName = document.querySelector("#btnName");
const list = document.querySelector("#list");
const totalList = document.querySelector("#totallist");

// fetches any existing data from local storage, validates and displays in list
window.onload = fetchInfo()

function fetchInfo() {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched){
        let data = JSON.parse(fetched[info]);

        const div = document.createElement('div');
        const div2 = document.createElement('div');
        const addBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        addBtn.innerText = '+';
        delBtn.innerText = 'x';
        addBtn.setAttribute('id', data.id);
        delBtn.setAttribute('id', data.id);
        div.append(`${data.firstName} ${data.lastName} - $`);
        div2.append(`${data.total}`);
        div2.append(addBtn);
        div2.append(delBtn);
        list.append(div, div2);

    }
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

// resets input fields to blank after submitted
function clearInputs() {
    firstName.value = '';
    lastName.value = '';
    total.value = '';
};


// creates new items, appends to container, saves to local storage
function newSuarez() {
    const debtor = {
        firstName: firstName.value,
        lastName: lastName.value,
        total: total.value,
        id: Date.now()
    };
    console.log(debtor)

    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const addBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    addBtn.innerText = '+';
    delBtn.innerText = 'x';
      
    addBtn.setAttribute('id', `${debtor.id}`);
    delBtn.setAttribute('id', `${debtor.id}`);
    div.append(`${debtor.firstName}  ${debtor.lastName} - $`);
    div2.append(`${debtor.total}`);
    div2.append(addBtn);
    div2.append(delBtn);
    list.append(div, div2); 

    clearInputs();

    let debtorString = JSON.stringify(debtor);
    localStorage.setItem(debtor.id, debtorString);
};


// validation for empty fields
function checkFields() {
    if(firstName.value === '' || lastName.value === '') {
        alert('Enter All Values');
        clearInputs();
    } else {
        newSuarez();
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
        let existingTotal = parseInt(element.parentElement.innerText);
        let addAmount = parseInt(prompt("Enter amount to ADD to existing total"));
        let newTotal = addAmount += existingTotal;
        console.log(newTotal)
        return existingTotal = newTotal
    }
});