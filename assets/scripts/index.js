let access_token = undefined;

const getToken = () => {
    $.ajax({
        type: "POST",
        url: "src/get_token.php",
        data: "",
        success: (response) => {
            // data = JSON.parse(response);
            // access_token = data.access_token;
            access_token = response;
        }
    });
}

getToken();

setTimeout(() => {
    //console.log(access_token);
    // if (access_token === undefined) location.reload();
}, 2000);


let show_data = $("#result");
/*
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

*/


$("#payWithBTC").click((e) => {
    e.preventDefault();

    let monto = parseFloat($(".monto-total").text().replace('$', ''));

    let data = {
        "monto": monto,
        "emailCliente": $("#client_email").val(),
        "nombreCliente": $("#client_name").val(),
        "apellidoCliente": $("#client_lastname").val(),
        "fechaNacimientoCliente": "2000-09-23 10:18:00",
        "documentoIdentidadCliente": $("#client_DUI").val(),
        "direccionCliente": $("#client_dir").val(),
        "idRegion": $("#client_region").val(),
        "idTerritorio": $("#client_territorio").val(),
        "configuracion": {
            "emailsNotificacion": "luisjosecruzmart@gmail.com",
            "urlWebhook": "https://developer.cuotta.com/wompi/webhook.php",
            "telefonosNotificacion": "61760155",
            "notificarTransaccionCliente": true
        },
        "access_token": access_token
    };

    $.ajax({
        type: "POST",
        url: "src/transactions_btc.php",
        data: data ,
        success: (response) => {
            //showPaidLinks(response);
            console.log(response);
            console.dir(JSON.parse(response));
            let data = JSON.parse(response);
            let datos = data["datosBitcoin"];
            let qr = datos["urlQR"];
            html =`<p>QR</p> 
                <img src='${qr}' width="250px">
            `;
            
            $(".modal-items").html(html);
            toggleModal();
        }
    });
});