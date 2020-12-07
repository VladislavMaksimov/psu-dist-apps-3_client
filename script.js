class Person {
    constructor (surname, name, secondName) {
        this.surname = surname;
        this.name = name;
        this.secondName = secondName;
    }
}

const renderPerson = (person) => {
    const personInfoAreas = document.getElementsByClassName("person_info");
    personInfoAreas[0].value = person.name;
    personInfoAreas[1].value = person.surname;
    personInfoAreas[2].value = person.secondName;
}

window.addEventListener('load', () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', () => {
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
    })
});