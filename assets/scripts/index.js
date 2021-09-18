let show_data = $("#result");

//  ajax to get access token
let access_token;

$.ajax({
    type: "POST",
    url: "src/get_token.php",
    data: "",
    success: (response) => {
        data = JSON.parse(response);
        access_token = data.access_token;
    }
});

$('#payment_link').click(() => {
    $.ajax({
        type: "POST",
        url: "src/payment_link.php",
        data: {"access_token": access_token} ,
        success: (response) => {
            showPaidLinks(response);
        }
    });
});

const showPaidLinks = json => {
    show_data.html(json);
}

// test transactions
$("#test_transactions").click((e) => {
    e.preventDefault();

    let fecha = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = fecha.toLocaleDateString("es-ES", options);

    let data = {
        "tarjetaCreditoDebido": {
            "numeroTarjeta": $("#card_number").val(),
            "cvv": $("#cvv").val(),
            "mesVencimiento": $("#expire_month").val(),
            "anioVencimiento": $("#expire_year").val()
        },
        "monto": $("#amount").val(),
        "emailCliente": $("#email").val(),
        "nombreCliente": $("#client").val(),
        "formaPago": "PagoNormal",
        "configuracion": {
            "emailsNotificacion": "",
            "urlWebhook": "https://developer.cuotta.com/wompi/webhook.php",
            "notificarTransaccionCliente": true
        },
        "datosAdicionales": {
            "Mandamiento": $("#mand").val(),
            "fecha": date
        },
        "access_token": access_token
    };

    $.ajax({
        type: "POST",
        url: "src/transactions.php",
        data: data ,
        success: (response) => {
            //showPaidLinks(response);
            console.log(response);
            console.dir(JSON.parse(response));
        }
    });
});


setTimeout(() => {
    console.log(access_token);
}, 2000)

