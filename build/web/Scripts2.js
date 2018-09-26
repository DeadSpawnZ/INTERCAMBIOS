
var participantes;
var arr, arr_n;
function inicia(codigo){
    get_datos();
    participantes = [];
    amigos(codigo);
    arr = [];
    arr_n = [];
}

function amigos(codigo){
    consulta_amigos();
    consulta_amigos_n();
    set_participantes(codigo);
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
                $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr[j].id_usuario2+"</span><i id="+arr[j].id_usuario2+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
            }
        }
        for(var j = 0; j < arr_n.length; j++){
            if(participantes[i] === arr_n[j].id_usuario2){
                $("#lista_participantes").append("<li class='list-group-item'>"+arr_n[j].nombre_relativo+"<span class='badge badge-primary float-right'>"+arr_n[j].id_usuario2+"</span><i id="+arr_n[j].id_usuario2+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i></li>");
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
            if(responseText == "EXITO"){
                alert("INTERCAMBIO REGISTRADO BIEN OK");
                location.href="Intercambio.html";
            }
        }
    }); 
}

function set_participantes(codigo){
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
            temp = temp.substr(1,temp.length-2);
            for(var j = 0; j < arr.length; j++){
                temp2= arr[j].id_usuario2.toString();
                if(temp==temp2){
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr[j].nombre_relativo+"<span style='background:#28a745;' class='badge badge-primary float-right'>"+participantes[i].id_usuario1+"</span><i id="+participantes[i].id_usuario1+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li>");
                }
            }
            for(var j = 0; j < arr_n.length; j++){
                temp2= arr_n[j].id_usuario2.toString();
                if(temp==temp2){
                    $("#lista_participantes").append("<li class='list-group-item'>"+arr_n[j].nombre_relativo+"<span style='background:#17a2b8;' class='badge badge-primary float-right'>"+participantes[i].id_usuario1+"</span><i id="+participantes[i].id_usuario1+" onclick='borra_participante(this.id)' class='fa fa-trash float-right mr-3'></i><span class='pendiente'>"+participantes[i].estado+"</span></li>");
                }
            }
        }
    }});
}

