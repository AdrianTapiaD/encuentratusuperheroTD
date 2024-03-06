function buscarSuperhero() {
    let numeroSuperhero = $('#numero').val();

    $.ajax({
        url: 'https://superheroapi.com/api/4905856019427443/' + numeroSuperhero,
        type: 'GET',
        success: function(response) {
            console.log('API Response:', response);

            if (response.response === 'success') {
                console.log('Full API Response:', response);

                const nombreSuperhero = response.name;
                const imgURL = response.image.url;

                $('#respuesta').html('<p>Nombre del Superhero: ' + nombreSuperhero + '</p>' + '<img src="' + imgURL + '" alt="' + nombreSuperhero + '">');
            } else {
                $('#respuesta').text('No se encontró Superhero');
            }
        },
        error: function(error) {
            console.error('Error al recibir información desde API:', error);
            $('#respuesta').text('Tu resultado es:');
        }
    });
}