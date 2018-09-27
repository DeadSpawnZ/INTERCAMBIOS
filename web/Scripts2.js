var participantes;
var arr, arr_n;
var codigo2=localStorage.getItem("key");

function iniciaHecho(){
    $("#intC").html(codigo2);
    get_datos();
}

function iniciaKey(){
    get_datos();
}

function key(){
    var clave= $("#ingk").val();
    $.get("valK", {codigo:clave}, function(resp){
        if(resp=="EXITO"){
            $.get("getS", {codigo:clave}, function(code){
               $("#ings").html(code);
               $("#ing1").hide();
               $("#ing2").show();
            });
        }else{
            alert(resp);
        }
    });
}

function key2(){
    var clave= $("#ingk").val();
    var tema= $("#ings").val();alert(tema);
    $.get("valK2", {codigo:clave, tema:tema}, function(resp){
        if(resp=="EXITO"){
            alert("Invitación confirmada");
            $("#ing2").hide();
            $("#ing1").show();
            getInterOP(); ///AQUI LE MOVIIIIII
        }else{
            alert(resp);
        }
    });
}

function inicia(codigo){
    get_datos();
    participantes = [];
    arr = [];
    arr_n = [];
    amigos(codigo);
}

function amigos(codigo){
    $.get('sorteo_b',{codigo:codigo},function(resp){
        if(resp== "hecho"){
            location.href= "intercambio_hecho.html";
        }else{
            consulta_amigos();
            consulta_amigos_n();
            set_participantes(codigo);
        }
    });
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

function agrega_participante(id_participante){
    console.log(participantes);
    var nuevo_p = {"estado":"PENDIENTE", "id_intercambio":0, "id_usuario1":id_participante};
    var flg= false;
    for(var i=0; i < participantes.length; i++){
        if(participantes[i].id_usuario1 == nuevo_p.id_usuario1){
            flg = true;
        }
    }
    if(flg){
        alert("YA ESTÁ AGREGADO");
    }else{
        $.get('agregarParticipante',{id_usuario1:id_participante, codigo:codigo2},function(){
        sp();
    });
    }
}

function borra_participante(id_usuario1){
    $.get('borrarParticipante',{id_intercambio:document.getElementById(id_usuario1+"i").value},function(){
        sp();
    });
}

function modifica_inter(){
    console.log(participantes);
    $.ajax({
        type: 'POST',
        url: 'Modifica_Inter',
        data: {
            codigo:                 codigo2,
            temas:                  $('#temas').val(),
            monto_max:              $('#monto_max').val(),
            fecha_inter:            $('#fecha_inter').val(),
            fecha_limite:           $('#fecha_limite').val(),
            comentarios:            $('#comentarios').val()
        },
        success: function(responseText){
            if(responseText == "EXITO"){
                alert("Cambios guardados");
                $("#temas").prop("disabled",true);
                $("#monto_max").prop("disabled",true);
                $("#fecha_inter").prop("disabled",true);
                $("#fecha_limite").prop("disabled",true);
                $("#comentarios").prop("disabled",true);
                $("#mInterG").hide();
                $("#mInterM").show();
            }
        }
    }); 
}

function sp(){
    $("#lista_participantes").html("");
    participantes = [];
    $.ajax({
        type: 'POST',
        url: 'get_participantes',
        data: {codigo:codigo2
        },
        success: function(JSONr){
        participantes = JSON.parse(JSONr);
        var temp="", temp2="";
        for(var i = 0; i < participantes.length; i++){
            temp = participantes[i].id_usuario1.toString();
            for(var j = 0; j < arr.length; j++){
                temp2= arr[j].id_usuario2.toString();
                if(temp==temp2){
                    participantes[i].id_usuario1=arr[j].id_usuario2;
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span style='background:#28a745;' class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id='"+arr[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li><input id='"+arr[j].id_usuario2+"e' type='text' style='display:none;' value='"+participantes[i].estado+"'/><input id='"+arr[j].id_usuario2+"i' type='text' style='display:none;' value='"+participantes[i].id_intercambio+"'/>");
                }
            }
            for(var j = 0; j < arr_n.length; j++){
                temp2= arr_n[j].id_usuario2.toString();
                if(temp==temp2){
                    participantes[i].id_usuario1=arr_n[j].id_usuario2;
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr_n[j].nombre_relativo+"<span style='background:#17a2b8;' class='badge badge-primary float-right'>"+arr_n[j].id_usuario2+"</span><i id='"+arr_n[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li><input id='"+arr_n[j].id_usuario2+"e' type='text' style='display:none;' value='"+participantes[i].estado+"'/><input id='"+arr_n[j].id_usuario2+"i' type='text' style='display:none;' value='"+participantes[i].id_intercambio+"'/>");
                }
            }
        }}
    });
}

function set_participantes(codigo){
    $("#lista_participantes").html("");
    participantes = [];
    $.ajax({
        type: 'POST',
        url: 'get_participantes',
        data: {codigo:codigo
        },
        success: function(JSONr){
        participantes = JSON.parse(JSONr);
        var temp="", temp2="";
        for(var i = 0; i < participantes.length; i++){
            temp = participantes[i].id_usuario1.toString();
            for(var j = 0; j < arr.length; j++){
                temp2= arr[j].id_usuario2.toString();
                if(temp==temp2){
                    participantes[i].id_usuario1=arr[j].id_usuario2;
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span style='background:#28a745;' class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id='"+arr[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li><input id='"+arr[j].id_usuario2+"e' type='text' style='display:none;' value='"+participantes[i].estado+"'/><input id='"+arr[j].id_usuario2+"i' type='text' style='display:none;' value='"+participantes[i].id_intercambio+"'/>");
                }
            }
            for(var j = 0; j < arr_n.length; j++){
                temp2= arr_n[j].id_usuario2.toString();
                if(temp==temp2){
                    participantes[i].id_usuario1=arr_n[j].id_usuario2;
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr_n[j].nombre_relativo+"<span style='background:#17a2b8;' class='badge badge-primary float-right'>"+arr_n[j].id_usuario2+"</span><i id='"+arr_n[j].id_usuario2+"' onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li><input id='"+arr_n[j].id_usuario2+"e' type='text' style='display:none;' value='"+participantes[i].estado+"'/><input id='"+arr_n[j].id_usuario2+"i' type='text' style='display:none;' value='"+participantes[i].id_intercambio+"'/>");
                }
            }
        }
        $.get('sessionFake', function(status){
                if(status==="304"){
                    location.href="index.html";
                }
                $("#intC").html(codigo);
                $.get('getValues', {codigo:codigo},function(JSONr){
                     var intValues= JSON.parse(JSONr);
                     $("#temas").val(intValues[0].temas);
                     $("#monto_max").val(intValues[0].monto_max);
                     $("#fecha_inter").val(intValues[0].fecha_inter);
                     $("#fecha_limite").val(intValues[0].fecha_limite);
                     $("#comentarios").val(intValues[0].comentarios);
                     $("#temas").prop("disabled",true);
                     $("#monto_max").prop("disabled",true);
                     $("#fecha_inter").prop("disabled",true);
                     $("#fecha_limite").prop("disabled",true);
                     $("#comentarios").prop("disabled",true);
                });
        });
    }});
}

function initMod(){
    $("#temas").prop("disabled",false);
    $("#monto_max").prop("disabled",false);
    $("#fecha_inter").prop("disabled",false);
    $("#fecha_limite").prop("disabled",false);
    $("#comentarios").prop("disabled",false);
    $("#mInterM").hide();
    $("#mInterG").show();
}

function borrarInter(codigo){
    $.get("Borrar_Inter",{codigo:codigo}, function(){
        location.href= "Intercambio_consulta.html";
    });
}

function sorteo(){
    $.get("sorteo", {codigo:codigo2}, function(resp){
        if(resp== "EXITO"){
            alert("Sorteo realizado");
            location.href="intercambio_hecho.html";
        }else {
            alert(resp);
        }
    });
}