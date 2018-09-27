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
var arr, arr_n;
function inicia(){
    get_datos();
    amigos();
    participantes = [];
    arr = [];
    arr_n = [];
}

function amigos(){
    consulta_amigos();
    consulta_amigos_n();
}

function get_datos(){
    $.ajax({
        type: 'POST',
        url: 'Data_Session',
        data: {
        },
        success: function(JSONRespuesta){
            var arr = JSON.parse(JSONRespuesta);
            console.log("DATOS DEL USUARIO1");
            console.log(arr);
            for(var i = 0; i < arr.length; i++){
                $("#nombre_usuario").append(arr[i].nombre);
            }
        }
    });
}

function consulta_amigos(){
    $("#lista_amigos").html("");
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
                $("#lista_amigos").append("<li style='cursor: pointer' id='"+arr[i].id_usuario2+"' class='list-group-item' ondblclick='agrega_participante(this.id)'>"+arr[i].nombre_relativo+"<span class='badge badge-success float-right'>"+arr[i].id_usuario2+"</span></li>");
            }
        }
    });
}

function consulta_amigos_n(){
    $.ajax({
        type: 'POST',
        url: 'Consulta_Amigos_N',
        data: {
        },
        success: function(JSONRespuesta){
            arr_n = JSON.parse(JSONRespuesta);
            console.log("AMIGOS CONSULTADOS N");
            console.log(arr_n);
            for(var i = 0; i < arr_n.length; i++){
                $("#lista_amigos").append("<li style='cursor: pointer' id='"+arr_n[i].id_usuario2+"' class='list-group-item' ondblclick='agrega_participante(this.id)'>"+arr_n[i].nombre_relativo+"<span class='badge badge-info float-right'>"+arr_n[i].id_usuario2+"</span></li>");
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
            location.href="Intercambio.html";
        }
    });
}

function agrega_participante(id_participante){
    console.log(participantes);
    if(participantes.includes(id_participante)){
        alert("YA ESTÁ AGREGADO");
    }else{
        participantes.push(id_participante);
        participantes_dom();
    }
}

function participantes_dom(){
    $("#lista_participantes").html("");
    for(var i = 0; i < participantes.length; i++){
        for(var j = 0; j < arr.length; j++){
            if(participantes[i] === arr[j].id_usuario2){
                $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id='"+arr[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
            }
        }
        for(var j = 0; j < arr_n.length; j++){
            if(participantes[i] === arr_n[j].id_usuario2){
                $("#lista_participantes").append("<li class='list-group-item'>"+arr_n[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr_n[j].id_usuario2+"</span><i id='"+arr_n[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
            }
        }
    }
}

function borra_participante(id_participante){
    if(participantes.includes(id_participante)){
        participantes.splice(participantes.lastIndexOf(id_participante), 1);
        participantes_dom();
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
                location.href="Intercambio.html";
            }
        }
    }); 
}

function consultaInter(codeI){
    localStorage.setItem("key", codeI);
    location.href="Intercambio_gest.html";
}