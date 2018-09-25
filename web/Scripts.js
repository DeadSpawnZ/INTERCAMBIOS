/* global reponseText */

function f_registro(){
    $.ajax({
        type: 'POST',
        url: 'Servlet_Registro',
        data: {
            correo:     $('#correo').val(),
            pass:       $('#pass').val(),
            nombre:     $('#nombre').val(),
            apellidop:  $('#apellidop').val(),
            apellidom:  $('#apellidom').val(),
            alias:      $('#alias').val()
        },
        success: function(responseText){
            alert(responseText);
            $("#formReg").trigger("reset");
        }
    });
}

function f_inicio(){
    $.ajax({
        type: 'POST',
        url: 'Servlet_Inicio',
        data: {
            correo:     $('#correo').val(),
            pass:       $('#pass').val()
        },
        success: function(responseText){
            if(responseText !== "SIN REGISTRO"){
                location.href="Intercambio.html";
            }else{
                $("#formIni").trigger("reset");
            }
        }
    });    
}

//SCRIPTS INTERCAMBIO.HTML
function inicia(){
    consulta_amigos();
}
function consulta_amigos(){
    /*$.ajax({
        type: 'POST',
        url: 'Servlet_Amigos',
        data: {
            correo:     $('#correo').val(),
            pass:       $('#pass').val()
        },
        success: function(responseText){
            if(responseText !== "SIN REGISTRO"){
                location.href="Intercambio.html";
            }
        }
    }); */
}
function agrega_amigos(){
    $.ajax({
        type: 'POST',
        url: 'Agrega_Amigos',
        data: {
            correo:                 $('#correo').val(),
            nombre_relativo:        $('#nombre_relativo').val()
        },
        success: function(responseText){
            alert(responseText);
        }
    }); 
}