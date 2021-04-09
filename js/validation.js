const form = document.getElementById('form');
const register = document.getElementById('register');
const betaling = document.getElementById('betalingswijze');
const error = document.getElementById('error');

//https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
register.style.display = "none";
betaling.style.display = "none";
error.style.display = "none";

let errors;

//https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
//eerste letter hoofdletter maken.
const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

//https://www.youtube.com/watch?v=In0nB0ABaUk

function validateForm(){
    form.addEventListener('submit', (e) => {
        errors = [];
        let veldenNotEmpty = [];

        //Nodige velden ophalen
        const voornaam = form.elements["voornaam"];
        const naam = form.elements["naam"];
        const gebruikersnaam = form.elements["gebruikersnaam"];
        const adres = form.elements["adres"];
        const land = form.elements["land"];
        const provincie = form.elements["provincie"];
        const wachtwoord = form.elements["wachtwoord"];
        const herhaalWachtwoord = form.elements["herhaalWachtwoord"];
        const betalingsOptie = form.elements["betalingsOptie"];
        const postcode = form.elements["postcode"];
        const voorwaarden = form.elements["akkoord"];

        //Velden verplicht zijn in array stoppen voor loop
        veldenNotEmpty.push(voornaam);
        veldenNotEmpty.push(naam);
        veldenNotEmpty.push(gebruikersnaam);
        veldenNotEmpty.push(adres);
        veldenNotEmpty.push(land);
        veldenNotEmpty.push(provincie);

        veldenNotEmpty.forEach(element => {
            let id = element.getAttribute('id');
            id = capitalize(id);

            //checkEmtyField uitvoeren.
            checkEmptyField(element, id + ' mag niet leeg zijn.');
        });

        if(validateEmail(form.elements["email"].value) == false){
            errors.push('E-mailadres is niet correct.');
        }

        validatePassword(wachtwoord, herhaalWachtwoord);

        validatePayment(betalingsOptie);

        validatePC(postcode);

        validateTerms(voorwaarden);

        if(errors.length > 0){
            error.innerHTML = "<h2>Yikes, errors...</h2>" + errors.join('<br>');
            register.style.display = "none";
            betaling.style.display = "none";
            error.style.display = "inline";
        }else{
            error.style.display = "none";
            register.style.display = "inline";
            betaling.style.display = "inline";
        }
        
        e.preventDefault();

    });
}

function checkEmptyField(veld, melding){
    if(veld.value === '' || veld.value == null){
        errors.push(melding);
        return true;
    }
    return false;
}

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    //Regex voor toegelaten characters
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(passwordVeld, confirmPasswordVeld){
    const passwordLengthRequired = 8;

    //returns om het weergeven van foutmeldingen te beperken
    if(checkEmptyField(passwordVeld, capitalize(passwordVeld.getAttribute('id') + ' mag niet leeg zijn.'))){
        return;
    }
    
    if(checkEmptyField(confirmPasswordVeld, capitalize(confirmPasswordVeld.getAttribute('id') + ' mag niet leeg zijn.'))){
        return;
    }

    if(passwordVeld.value.length < passwordLengthRequired){
        errors.push('Wachtwoord moet minstens ' + passwordLengthRequired + ' karakters lang zijn.');
    }

    if(passwordVeld.value != confirmPasswordVeld.value){
        errors.push('Wachtwoorden komen niet overeen.');
    }
}

function validatePayment(veld){
    if(veld.value != null){
        //Loop over alle radiobuttons in het veld
        let veld_value;
        for(var i = 0; i < veld.length; i++){
            if(veld[i].checked){
                //Opslaan van value van de checked radiobutton
                //Er kan maar 1 radiobutton actief zijn, dus break uit de loop na het vinden van een actieve button
                veld_value = veld[i].value;
                break;
            }
        }

        document.getElementById('betalingsbeschrijving').innerHTML = "Je betalingswijze is " + veld_value;
    }
}

function validatePC(veld){
    if(veld.value < 1000 || veld.value > 9999){
        errors.push('De waarde van postcode moet tussen 1000 en 9999 liggen');
    }
}

function validateTerms(veld){
    if(veld.checked == false){
        errors.push('Gelieve de algemene voorwaarden te accepteren.');
    }
}
