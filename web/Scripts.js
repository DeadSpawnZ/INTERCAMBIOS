function f_registro(){
    $.ajax({
        url: 'Servlet_Registro',
        data: {
            nombre : $('#nombre').val()
        },
        success: function(responseText) {
            alert(responseText);
        }
    });
}