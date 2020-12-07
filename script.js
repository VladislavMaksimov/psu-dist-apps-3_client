class Person {
    constructor (surname, name, secondName) {
        this.surname = surname;
        this.name = name;
        this.secondName = secondName;
    }
}

class Unit {
    constructor (name, gender) {
        this.name = name;
        this.gender = gender;
    }

    serialize() {
        return {
            name: this.name,
            gender: this.gender
        }
    }
}

const renderPerson = (person) => {
    const personInfoAreas = document.getElementsByClassName("person_info");
    personInfoAreas[0].value = person.name;
    personInfoAreas[1].value = person.surname;
    personInfoAreas[2].value = person.secondName;
}

const getPerson = () => {
    const maleButton = document.getElementById('male');
    const femaleButton = document.getElementById('female');
    let gender;
    
    if (maleButton.checked)
        gender = 'male';
    else if (femaleButton.checked)
        gender = 'female';
            else {
                alert('Укажите пол!');
                return;
            }
    
    fetch('http://localhost:8080/random/' + gender, {
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(json => renderPerson(new Person(json['name'], json['surname'], json['second_name'])))
}

const renderData = () => {

}

getBooleanGender = (radioMale, radioFemale) => {
    let gender;
    if (radioMale.checked)
        gender = true;
    else if (radioFemale.checked)
        gender = false;
            else return null;
    return gender;
}

const addUnit = (unit, unit_type) => {
    fetch('http://localhost:8080/new/' + unit_type, {
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unit.serialize())
    })
}
        
const addSurname = () => {
    const surnameInput = document.getElementById('sur_text');
    const radioMale = document.getElementById('sur_male');
    const radioFemale = document.getElementById('sur_female');
    const gender = getBooleanGender(radioMale, radioFemale);
    if (gender === null) {
        alert('Укажите пол!');
        return;
    }
    unit = new Unit(surnameInput.value, gender);
    addUnit(unit, 'surname');
}

const addName = () => {
    const nameInput = document.getElementById('name_text');
    const radioMale = document.getElementById('name_male');
    const radioFemale = document.getElementById('name_female');
    const gender = getBooleanGender(radioMale, radioFemale);
    if (gender === null) {
        alert('Укажите пол!');
        return;
    }
    unit = new Unit(nameInput.value, gender);
    addUnit(unit, 'name');
}

const addSecondName = () => {
    const secondNameInput = document.getElementById('sec_text');
    const radioMale = document.getElementById('sec_male');
    const radioFemale = document.getElementById('sec_female');
    const gender = getBooleanGender(radioMale, radioFemale);
    if (gender === null) {
        alert('Укажите пол!');
        return;
    }
    unit = new Unit(secondNameInput.value, gender);
    addUnit(unit, 'second_name');
}

window.addEventListener('load', () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', () => getPerson());
    
    const addSurnameButton = document.getElementById('sur_add');
    addSurnameButton.addEventListener('click', () => addSurname());

    const addNameButton = document.getElementById('name_add');
    addNameButton.addEventListener('click', () => addName());

    const addSecondNameButton = document.getElementById('sec_add');
    addSecondNameButton.addEventListener('click', () => addSecondName());
});