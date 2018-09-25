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
    get_datos();
    consulta_amigos();
}

function get_datos(){
    $.ajax({
        type: 'POST',
        url: 'Data_Session',
        data: {
        },
        success: function(JSONRespuesta){
            var arr = JSON.parse(JSONRespuesta);
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
            var arr = JSON.parse(JSONRespuesta);
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
}

function agrega_participante(id_participante){
    /*var array = 
    for(var i = 0; i < array.length; i++){
        $("#lista_amigos").pa
    }*/
}