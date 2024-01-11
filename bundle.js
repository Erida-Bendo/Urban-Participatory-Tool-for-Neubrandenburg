document.getElementById('coordinates');
var map = new maplibregl.Map({
    container: 'map',
    style:
    'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [13.26058, 53.55646],
    zoom: 15
});


map.on('load', function () {
    // URL to your GeoJSON file
    const geojson2 = 'holeyBurscheid.geojson';

    // Fetch the MultiPolygon GeoJSON data from the file
    fetch(geojson2)
        .then((response) => response.json())
        .then((data) => {
            // Add a GeoJSON source to the map using the fetched data
            map.addSource('2', {
                type: 'geojson',
                data: data
            });

            // Add a layer to display the MultiPolygon data
            map.addLayer({
                id: '2',
                type: 'fill',
                source: '2',
                paint: {
                    'fill-color': 'red',
                    'fill-opacity': 0.15,  
                }
                
            });
        })
        .catch((error) => {
            console.error('Error loading MultiPolygon GeoJSON:', error);
        });

});


map.setMinZoom(14);

var markers=[];
const button = document.getElementsByClassName("btn-primary")[0];

const intro = document.getElementById("intro");
const title = document.getElementById("name");
const info = document.getElementsByClassName("infoContainer")[0];
const logo=document.getElementById("icon");
const analysis = document.getElementById("analysis");
const menu = document.getElementsByClassName("menu")[0];

function createMarkers(num, col){
    a=13.2539;
    b=53.5528;
    for (let i = 0; i < num; i++) {
        const marker = new maplibregl.Marker({draggable: true, color:col})
        .setLngLat([a, b])
        .addTo(map);
        markers.push(marker);
        a+=0.0013;
      }
}
function removeMarkers(){
    for (var i = markers.length - 1; i >= 0; i--) {
        markers[i].remove();
      }
    markers=[];
}

function getMarkerCoordinates(type){
    for (var i = markers.length - 1; i >= 0; i--){
        var lngLat=markers[i].getLngLat();
        console.log(type+" "+i+" Longitude: "+lngLat.lng+" Latitude: "+ lngLat.lat);
    }
}

var input= document.createElement("input");
function createInput(){
    input.type="text";
    input.id="input";
    intro.appendChild(input);
}

function getInput(type){
    console.log(type + " " + input.value)
    input.value="";
}

function addLogo(string){
    logo.src=string;
}


const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let selectedCount = 0;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedCount++;
        } else {
            selectedCount--;
        }

        if (selectedCount > 3) {
            checkbox.checked = false;
            selectedCount--;
        }

        if (selectedCount === 3) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'disabled');
        }
    });
});



const selectedElements = [];

const funcs=[
    function(){
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        logo.style.width="100px";
        logo.style.height="100px";
        title.innerHTML="1. Entstehung von Hitzeinseln durch Verschattung vorbeugen";
        title.style.color="#fcd500";
        intro.innerHTML = "<b>Unsere Analysen zeigen, dass die Zeiträume, in denen Hitzestress empfunden wird, sich bis 2050 mehr als verdoppeln werden.\
                           Als übergeordnete Maßnahme kann Verschattung diesem Hitzestress entgegenwirken.</b>\
                           <br><br> Wir haben folgende Maßnahmen ausgewählt, um eine ausreichende Verschattung zu ermöglichen:\
                           <br><br><i> - Temporäre und mobile Verschattungselemente im öffentlichen Raum\
                           <br> - Bäume im Straßenraum\
                           <br> - Pergolen<i/>";
        addLogo("/icons/sun.png");
        button.innerHTML="Zu den Maßnahmen";
    },
    function(){
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Temporäre und mobile Verschattungselemente im öffentlichen Raum</b>\
                        <br><br>Mobile Verschattungselemente können eingesetzt werden, um Außenräume vor Sonneneinstrahlung zu bestimmten Zeiten zu schützen. Ein Beispiel dafür sind Schirme mit beweglichem Sockel.<br><br>\
                        <b>Gibt es Ihrer Meinung nach einen Bedarf an mobilen Verschattungselementen in der Innenstadt?<br>Falls ja, verschieben Sie die eben erschienenen blauen Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        addLogo("/icons/sun.png");
        createMarkers(4,"#AED6F1");
    },
    function(){
        getMarkerCoordinates(0);
        getInput(0);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Bäume im Straßenraum</b>\
                        <br><br>Durch Überschirmung, Beschattung und Verdunstung können Bäume den thermischen Komfort erheblich verbessern.\
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Bäumen in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(6,"#17A589");
    },
    function(){
        getMarkerCoordinates(1);
        getInput(1);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Pergolen</b>\
                        <br><br>Pergolen sind ein dauerhaftes Raumelement, das in Kombination mit einer Bepflanzung im Sommer Schatten spendet. Gleichzeitig kann im Winter Sonnenlicht durch die Lamellen fallen. \
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Pergolen in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#1A5276");
    },
    function(){
        getMarkerCoordinates(2);
        getInput(2);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        title.innerHTML="2. Wärmespeicher in der Innenstadt vermeiden";
        title.style.color="#fc7700";
        intro.innerHTML = "<b>Gebäude, Straßen und andere Infrastrukturen absorbieren Sonnenwärme stärker als natürliche Landschaften, wie Wälder und Gewässer. Städtische Gebiete, in denen diese Strukturen stark konzentriert und nur wenige Grünflächen vorhanden sind, werden zu 'Hitzeinseln' mit höheren Temperaturen im Vergleich zu abgelegenen Gebieten.</b>\
                           <br><br> Wir haben folgende Maßnahmen ausgewählt, um Wärmespeicher in der Stadt zu vermeiden:\
                           <br><br><i> - Begrünung\
                           <br> - Reduzierung der Versiegelung";
        button.innerHTML="Zu den Maßnahmen";
        addLogo("/icons/materials.png");
    },
    function(){
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Begrünung</b>\
                        <br><br>Die Begrünung von Dachflächen und Gebäudefassaden kann durch Verdunstungskühlung Temperaturen senken und die Luftqualität verbessern. \
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Gebäudebegrünung in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#212F3D");
    },
    function(){
        getMarkerCoordinates(3);
        getInput(3);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Reduzierung der Versiegelung</b>\
                        <br><br>Entsiegelte Flächen speichern im Gegensatz zu versiegelten Flächen weniger Wärme. Außerdem tragen sie durch eine höhere Verdunstungsleistung zur Abkühlung der Umgebung bei und können eine Möglichkeit der Versickerung darstellen (Schwammstadtprinzip).\
                        <br><br><b>Gibt es Ihrer Meinung nach versiegelte Flächen die den thermischen Komfort in der Innenstadt verschlimmern?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#F5CBA7");
    },

    function(){
        getMarkerCoordinates(4);
        getInput(4);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        title.innerHTML="3. Kritische Kaltluftströme verhindern";
        title.style.color="#00d0fc";
        intro.innerHTML = "<b>Starke Winde erhöhen die empfundene Kälte im Winter.</b>\
                           <br><br> Wir haben folgende Maßnahmen ausgewählt, um kritische Kaltluftströme zu vermeiden:\
                           <br><br><i> - Hecken\
                           <br> - Pavillons, Flugbauten";
        button.innerHTML="Zu den Maßnahmen";
        addLogo("/icons/wind.png");
    },
    function(){
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Hecken</b>\
                        <br><br>Hecken können dazu beitragen, die im Winter vorherrschende kalten Luftströme zu brechen, und so Kältestress zu reduzieren. \
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Hecken in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#EC7063");
    },
    function(){
        getMarkerCoordinates(5);
        getInput(5);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Pavillons, Flugbauten</b>\
                        <br><br>Pavillons und Flugbauten können Luftströme brechen und geschützte Aufenthaltsorte bieten. Sie können sowohl als eigenständige Anlagen als auch als Erweiterung von Gebäuden platziert werden.\
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Pavillons in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#229954");
    },
    function(){
        getMarkerCoordinates(6);
        getInput(6);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        title.innerHTML="3. Lebens- und Aufenthaltsqualität stärken";
        title.style.color="#fc0024";
        intro.innerHTML = "<b>Folgende Maßnahmen können die Aufenthaltsqualität im Freien steigern\
                            und diese Aufenthaltsorte so den Bewohnern das ganze Jahr über zugänglich machen:</b>\
                           <br><br><i> - Verschattete Sitzgelegenheiten\
                           <br> - Fahrradinfrastruktur\
                           <br> - Wasserspender\
                           <br> - Spielplätze";
        button.innerHTML="Zu den Maßnahmen";
        addLogo("/icons/people.png");
    },
    function(){
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Verschattete Sitzgelegenheiten</b>\
                        <br><br>Sitzgelegenheiten sollten im Sommer verschattet werden, sodass Nutzer diese über einen längeren Zeitraum nutzen können.\
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an verschatteten Sitzgelegenheiten in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        
        addLogo("/icons/people.png");
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(7,"#F4D03F");
    },
    function(){
        getMarkerCoordinates(7);
        getInput(7);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Fahrradinfrastruktur</b>\
                        <br><br>Fahrradwege und Abstellplätze fördern den Radverkehr als nachhaltiges Verkehrsmittel in der Stadt. Diese Fahrradwege sollten verschattet und bedarfsgerecht geführt werden. \
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Fahrradinfrastruktur in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#AED6F1");
    },
    function(){
        getMarkerCoordinates(8);
        getInput(8);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Wasserspender</b>\
                        <br><br>Angesichts der steigenden Hitzebelastung in Städten sollte frei zugängliches Trinkwasser an verschiedenen Orten zur Verfügung gestellt werden.\
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Wasserspender in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#17A589");
    },
    function(){
        getMarkerCoordinates(9);
        getInput(9);
        removeMarkers();
        intro.innerHTML = intro.textContent.trim();
        info.style.height="20%";
        intro.innerHTML = "<b>Spielplätze</b>\
                        <br><br>Spielplätze spielen eine wichtige Rolle bei der gesunden Entwicklung von Kindern und Jugendlichen. Daher sollten sie gut verschattet und mit ausreichenden Sitzmöglichkeiten ausgestattet werden.\
                        <br><br><b>Gibt es Ihrer Meinung nach einen Bedarf an Spielplätzen in der Innenstadt?<br>Falls ja, verschieben Sie die Markierungen in der Karte an die gewünschten Stellen. Optional können Sie auch unten einen Kommentar hinterlassen.\
                        Um zum nächsten Schritt zu gelangen, klicken Sie bitte unten auf die Schaltfläche.\
                        <br><br>";
        button.innerHTML="Zum nächsten Schritt";
        createInput();
        createMarkers(4,"#1A5276");
    },
    function(){
        getMarkerCoordinates(10);
        getInput(10);
        logo.remove();
        removeMarkers();
        title.innerHTML="Klimatische Handlungsempfehlungen für die Innenstadt von Neubrandenburg";
        title.style.color="black";
        intro.innerHTML = "Wir bedanken uns für Ihre Teilnahme. Optional können Sie gerne Ihr Alter und Wohnort eintragen und einen Kommentar hinterlassen.";
        button.remove();

        input1=document.createElement("div");
        input1.id="inputs";
        info.appendChild(input1);

        var age = document.createElement("h");
        age.textContent="Alter:";
        var ageInput= document.createElement("input");
        ageInput.type="text";
        ageInput.id="input";

        var place = document.createElement("h");
        place.textContent="Wohnort:";
        var placeInput= document.createElement("input");
        placeInput.type="text";
        placeInput.id="input";

        input2=document.createElement("div");
        input2.id="inputs";
        info.appendChild(input2);


        input3=document.createElement("div");
        input3.id="inputs";
        info.appendChild(input3);

        input4=document.createElement("div");
        input4.id="inputs";
        info.appendChild(input4);

        var comment = document.createElement("h");
        comment.textContent="Kommentar:";
        var commentInput = document.createElement("input");
        commentInput.type = "text"; 
        commentInput.id="input";

        var visitor = document.createElement("h");
        visitor.textContent="Nutzergruppe:";


        var fruits = ["Bewohner", "Besucher", "Tourist"];

        // Create a select element
        var selectElement = document.createElement("select");
        selectElement.id = "fruitSelect";
        selectElement.name = "fruits";

        // Create and append option elements based on the array
        for (var i = 0; i < fruits.length; i++) {
            var optionElement = document.createElement("option");
            optionElement.value = fruits[i].toLowerCase();
            optionElement.text = fruits[i];
            selectElement.appendChild(optionElement);
        }    

            input1.appendChild(age);
            input1.appendChild(ageInput);
            input2.appendChild(place);
            input2.appendChild(placeInput);
            input3.appendChild(visitor);
            input3.appendChild(selectElement);
            input4.appendChild(comment);
            input4.appendChild(commentInput);
            

        
        var endButton = document.createElement("button");
        endButton.textContent = "Einreichen";
        endButton.id= "button";
        endButton.onclick = () =>{
            intro.innerHTML = "Wir bedanken uns für Ihre Teilnahme. <br> <br><b>Ihre Daten wurden erfolgreich eingereicht.<b/> <br><br><br><br><i>Unter dem folgenden Link können Sie mehr über Hitzeschutz und Hitzevorsorge in Deutschland erfahren.<i/><br/>";
            
            var link = document.createElement("a");

            // Set the href attribute to specify the URL
            link.href = "https://www.staedtetag.de/themen/klimaschutz-und-energie/hitzeschutz-hitzevorsorge-staedte";

            // Set the text content for the link
            link.textContent = "Hitzeschutz und Hitzevorsorge in Städten";
            intro.appendChild(link);


            endButton.remove();
            input1.remove();
            input2.remove();
            input3.remove();
            input4.remove();
            console.log(ageInput.value);
            console.log(placeInput.value);
            console.log(selectElement.value);
            console.log(commentInput.value);
        };

        info.appendChild(endButton);
    }
    
]

function func(){
    
    analysis.style.display="none";
    intro.style.display="block";
    button.removeEventListener('click', func);
    let i = 0;
    button.addEventListener("click", e => {
        funcs[i]();
        i++;
        if (i >= funcs.length) i = 0;
            
     });
    button.innerHTML="Zum nächsten Schritt"
}

button.addEventListener('click', func)