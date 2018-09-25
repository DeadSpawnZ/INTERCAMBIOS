/* global reponseText */

function f_registro(){
    var pass1= $('#pass').val(), pass2= $('#pass2').val();
    if(pass1==pass2){
        $.ajax({
            type: 'POST',
            url: 'Servlet_Registro',
            data: {
                correo:     $('#correo').val(),
                pass:       pass1,
                nombre:     $('#nombre').val(),
                apellidop:  $('#apellidop').val(),
                apellidom:  $('#apellidom').val(),
                alias:      $('#alias').val()
            },
            success: function(responseText){
                if(responseText=="EXITO"){
                    alert("Registrado");
                    $("#formReg").trigger("reset");
                }else{
                    alert("Error al realizar el registro");
                }
            }
        });
    }else{
        alert("No coinciden las contraseñas");
    }
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
                alert("Datos incorrectos");
                $("#formIni").trigger("reset");
            }
        }
    });    
}
//SCRIPTS INTERCAMBIO.HTML
var participantes;
var arr;
function inicia(){
    get_datos();
    consulta_amigos();
    participantes = [];
    arr = [];
}

function get_datos(){
    $.ajax({
        type: 'POST',
        url: 'Data_Session',
        data: {
        },
        success: function(JSONRespuesta){
            var arr = JSON.parse(JSONRespuesta);
            console.log("DATOS DEL USUARIO1")
            console.log(arr);
            for(var i = 0; i < arr.length; i++){
                $("#nombre_usuario").append(arr[i].nombre);
            }
        }
    });
}

function consulta_amigos(){
    $.ajax({
        type: 'POST',
        url: 'Consulta_Amigos',
        data: {
        },
        success: function(JSONRespuesta){
            arr = JSON.parse(JSONRespuesta);
            console.log("AMIGOS CONSULTADOS");
            console.log(arr);
            for(var i = 0; i < arr.length; i++){
                $("#lista_amigos").append("<li id="+arr[i].id_usuario2+" class='list-group-item' ondblclick='agrega_participante(this.id)'>"+arr[i].nombre_relativo+"<span class='badge badge-success float-right'>"+arr[i].id_usuario2+"</span></li>");
            }
        }
    });
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
            console.log(responseText);
        }
    });
    consulta_amigos();
}

function agrega_participante(id_participante){
    if(participantes.includes(id_participante)){
        alert("YA ESTÁ AGREGADO");
    }else{
        $("#lista_participantes").html("");
        participantes.push(id_participante);
        for(var i = 0; i < participantes.length; i++){
            for(var j = 0; j < arr.length; j++){
                if(participantes[i] === arr[j].id_usuario2){
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id="+arr[j].id_usuario2+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
                }
            }
        }
    }
}

function borra_participante(id_participante){
    if(participantes.includes(id_participante)){
        participantes.splice(participantes.lastIndexOf(id_participante), 1);
        $("#lista_participantes").html("");
        for(var i = 0; i < participantes.length; i++){
            for(var j = 0; j < arr.length; j++){
                if(participantes[i] === arr[j].id_usuario2){
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id="+arr[j].id_usuario2+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
                }
            }
        }
    }
}

function registra_inter(){
    console.log(participantes);
    $.ajax({
        type: 'POST',
        url: 'Agrega_Inter',
        data: {
            temas:             $('#temas').val(),
            monto_max:              $('#monto_max').val(),
            fecha_inter:            $('#fecha_inter').val(),
            fecha_limite:           $('#fecha_limite').val(),
            comentarios:            $('#comentarios').val(),
            participantes:          JSON.stringify(participantes)
        },
        success: function(responseText){
            if(responseText == "EXITOEXITO"){
                alert("INTERCAMBIO REGISTRADO BIEN OK");
            }
        }
    }); 
}
