document.addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('btn');
    btn.addEventListener('click', function() {
        buscarSuperhero();
    });

    let nombreSuperhero;

    function buscarSuperhero() {
        let numeroSuperhero = $('#numero').val();

        $.ajax({
            type: 'GET',
            url: 'https://superheroapi.com/api.php/4905856019427443/' + numeroSuperhero,
            dataType: "json",
            
            success: function(response) {
                console.log('API Response:', response);

                if (response.response === 'success') {
                    console.log('Full API Response:', response);

                    nombreSuperhero = response.name;
                    const imgURL = response.image.url;
                    const connSH = response.connections ? response.connections['group-affiliation'] || 'N/A' : 'N/A';
                    const occSH = response.work ? response.work.occupation || 'N/A' : 'N/A';
                    const faSH = response.biography ? response.biography['first-appearance'] || 'N/A' : 'N/A';
                    const heSH = response.appearance ? response.appearance['height'] || 'N/A' : 'N/A';
                    const weSH = response.appearance ? response.appearance['weight'] || 'N/A' : 'N/A';
                    const allSH = response.connections ? response.connections['relatives'] || 'N/A' : 'N/A';

                    $('#respuesta').html('<div class="card" style="width: 60%; margin: 0 auto; border: 2px solid grey;">' +
                        '<img src="' + imgURL + '" class="card-img-top" alt="' + nombreSuperhero + '">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">Nombre: ' + nombreSuperhero + '</h5>' +
                        '<p class="card-text">Conexiones: ' + connSH + '</p>' +
                        '<p class="card-text">Ocupación: ' + occSH + '</p>' +
                        '<p class="card-text">Primera aparición: ' + faSH + '</p>' +
                        '<p class="card-text">Altura: ' + heSH + '</p>' +
                        '<p class="card-text">Peso: ' + weSH + '</p>' +
                        '<p class="card-text">Alianzas: ' + allSH + '</p>' +
                        '</div>' +
                        '</div>');

                    $('#respuesta').append('<div id="chartContainer" style="height: 300px; width: 60%; margin: 20px auto;"></div>');
                    graficoCanvasjs(response.powerstats);
                }
                
                else {
                    $('#respuesta').text('No se encontró Superhero');
                }
            },
            error: function(error) {
                console.error('Error al recibir información desde API:', error);
                $('#respuesta').text('Tu resultado es:');
            }
        });
    }

    function graficoCanvasjs(powerstats) {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Estadísticas de poder de " + nombreSuperhero
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    { label: "Intelligence", y: parseInt(powerstats.intelligence) },
                    { label: "Strength", y: parseInt(powerstats.strength) },
                    { label: "Speed", y: parseInt(powerstats.speed) },
                    { label: "Durability", y: parseInt(powerstats.durability) },
                    { label: "Power", y: parseInt(powerstats.power) },
                    { label: "Combat", y: parseInt(powerstats.combat) }
                ]
            }]
        });

        chart.render();
    }
});
