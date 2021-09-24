// agregar espacios en cada cantidad de caracteres espeficicado.
function space(element, after = 4, e) {
    if (e.keyCode != "8") {
        let v = element.value.replace(/[^\d0-9]/g, ''),
        reg = new RegExp(".{" + after + "}","g")
        element.value = v.replace(reg, function (a, b, c) {
            return a + '  ';
        });
    }
}

function validateCard() {
    let regex1 = new RegExp("^[0-9]{14,18}$");
    let regex2 = new RegExp("^[0-9]{1,2}$");
    let regex3 = new RegExp("^[0-9]{4}$");
    let regex4 = new RegExp("^[0-9]{3,4}$");

    let number = document.getElementById("card_number").value;
    let mes = document.getElementById("card_month").value;
    let anio = document.getElementById("card_year").value;
    let name = document.getElementById("card_name").value;
    let cvv = document.getElementById("card_cvv").value;
    let html = ``;

    if (number.length === 0 || mes.length === 0 || anio.length === 0 || name.length === 0 || cvv.length === 0) {
        let card = (number.length === 0) ? 'color-error': 'color-success';
        let date = (mes == 0 || anio == 0) ? 'color-error': 'color-success';
        let nam = (name.length === 0) ? 'color-error': 'color-success';
        let cv = (cvv.length === 0) ? 'color-error': 'color-success';
        html +=`<p>Datos Requeridos</p>
                <li class="${card}">Número de tarjeta</li>
                <li class="${date}">Fecha de expiración</li>
                <li class="${nam}">Nombre</li>
                <li class="${cv}">CVV</li>`;
            
        $(".modal-items").html(html);
        toggleModal();
        
        return false;
    }

    // quitar espacios a los números de la tarjeta
    number = number.replace(/\D/g, '');
    
    if (regex1.test(number)) {
        if(luhnCheck(number) == 0) { 
            return console.log('Número de tarjeta incorrecto');
        } else {
            console.log('Número de tarjeta correcto');

            if (mes.length > 0 &&  anio.length > 0 && regex2.test(mes) && regex3.test(anio) ) { 
                if ( (mes >= 1) && (mes <= 12) && (anio >= 2022)) {
                    console.log('Fecha correcta');
                } else {
                    console.log('Fecha incorrecta');
                }
            }
            if (cvv.length > 0 && regex4.test(cvv) ) { 
                if ((cvv >= 100)) {
                    console.log('CVV correcto');
                } else {
                    console.log('CVV incorrecto');
                }
            }
        } 
        return false;
    } else { 
        return console.log('Número de tarjeta incorrecto');
    }
}

// validar el número de tarjeta
function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

function windowOnClick(event) {
    let modal = $(".modal");
    if (event.target === modal) {
        toggleModal();
    }
}

function toggleModal() {
    $(".modal").toggleClass("show-modal");
}

$(document).ready(function() {

    const formPayCard = $("#formPayCard");
    const cardNumber = $("#card_number");
    const cardCVV = $("#card_cvv");

    cardNumber.keyup(function(e) { space(this, 4, e) });

    formPayCard.submit(e => {e.preventDefault(); validateCard(); });
    
    cardCVV.keyup(function(){ $(this).val($(this).val().replace(/[^0-9]/g, '')) });
    
    const closeButton = document.querySelector(".close-button");

    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
    

});