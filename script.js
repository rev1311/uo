const debtors = document.querySelector("#debtors");
const total = document.querySelector("#total");
const btnName = document.querySelector("#btnName");
const list = document.querySelector("#list");


// fetches any existing data from local storage, validates and displays in list
window.onload = fetchInfo()

function fetchInfo() {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched){
        let data = JSON.parse(fetched[info]);
        
        if(data.name === '' || data.value === ''){
            data.remove();
        }; 
        
        const div = document.createElement('div');
        const btn = document.createElement('button');
        btn.innerText = 'del';
        btn.setAttribute('id', `${data.name}`)
        div.append(`${data.name}  ${data.total}`);
        div.append(btn);
        list.append(div);
    }
};


// removes data from local storage
function removeInfo(id) {
    let fetched = Object.assign({}, localStorage);
    for(info in fetched){
        let data = JSON.parse(fetched[info]);
        
        if(data.name === id){
            localStorage.removeItem(id);
        };
    }
};

// resets input fields to blank after submitted
function clearInputs() {
    debtors.value = '';
    total.value = '';
};

// creates new items, appends to container, saves to local storage
function newSuarez() {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerText = 'del';
    
    let debtor = {
        name: `${debtors.value}`,
        total: `${total.value}`
    };
    btn.setAttribute('id', `${debtor.name}`);
    div.append(`${debtor.name}  ${debtor.total}`);
    div.append(btn);
    list.append(div);
    clearInputs();

    let debtorString = JSON.stringify(debtor);
    localStorage.setItem(`${debtor.name}`, debtorString); 
};

// validation for empty fields
function checkFields() {
    if(debtors.value === '' || total.value === '') {
        alert('Enter both Values');
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


// onclick to delete items (will need rework if adding edit btn)
list.addEventListener('click', function(e) {
    e.preventDefault();
    const element = e.target;
    if(element.matches('button')) {
        removeInfo(element.id);
        element.parentElement.remove();
        
    };
});