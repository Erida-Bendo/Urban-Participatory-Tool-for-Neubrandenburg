const coordinates = document.getElementById('coordinates');
const map = new maplibregl.Map({
    container: 'map',
    style:
    'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [7.1138, 51.0837],
    zoom: 14
});
map.setMinZoom(12)

var markers=[];
const button = document.getElementsByClassName("btn-primary")[0];
const intro = document.getElementById("intro");
const info = document.getElementsByClassName("infoContainer")[0];
const logo=document.getElementById("icon");

function createMarkers(num, col){
    a=7.101182888795705;
    b=51.09206993491347;
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
    markers=[]
}

function getMarkerCoordinates(type){
    for (var i = markers.length - 1; i >= 0; i--){
        var lngLat=markers[i].getLngLat();
        console.log(type+" "+i+" Longitude: "+lngLat.lng+" Latitude: "+ lngLat.lat)
    }

}
function addLogo(string){
    const logo=document.getElementById("icon");
    logo.src=string
}

var extraInput;

function func1(){
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Bei Hitzewellen ist es wichtig, Trinkplätze anzubieten.</b><br> Wo würden Sie die Trinkplätze in Burscheid platzieren?<br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/drinking.png");
    createMarkers(5, "#AED6F1");
}
function func2(){
    getMarkerCoordinates("drinking spot");
    removeMarkers();
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Fontänen können den Komfort im Freien durch Verdunstungskühlung verbessern.</b><br> Wo würden Sie Fontänen in Burscheid platzieren?<br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/fountain.png");
    createMarkers(4,"#17A589");
}
function func3(){
    getMarkerCoordinates("fountain");
    removeMarkers();
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Vernebelungsanlagen sind eine Strategie zur Bekämpfung von Hitzestress, insbesondere dort, wo sich viele Menschen zusammenkommen oder vorbeigehen.</b><br> Wo würden Sie Vernebelungsanlagen in Burscheid platzieren?<br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/misting.png")
    createMarkers(4, "#1A5276");
}

function func4(){
    getMarkerCoordinates("misting");
    removeMarkers();
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Öffentliche Toiletten ermöglichen freie Bewegung in öffentlichen Räumen.</b><br> Wo würden Sie öffentliche Toiletten in Burscheid platzieren?<br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/restroom.png")
    createMarkers(4, "#212F3D");
}

function func5(){
    getMarkerCoordinates("restroom");
    removeMarkers();
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Sitzbänke unterstützten gesunde Alltagsroutinen.</b><br> Wo werden Ihrer Meinung nach Sitzbänke am meisten gebraucht??<br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/benches.png")
    createMarkers(10, "#F5CBA7");
}

function func6(){
    getMarkerCoordinates("benches");
    removeMarkers();
    intro.innerHTML = intro.textContent.trim();
    intro.innerHTML = "<b>Das Straßennetz und die hügelige Landschaft erschweren das Gehen zu Fuß.</b><br> Wo würden Sie Rampen platzieren?<br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen ";
    button.innerHTML="Zum nächsten Schritt";
    addLogo("/icons/accessibility.png")
    createMarkers(5, "#EC7063");
}

function func7(){
    getMarkerCoordinates("accesibility spot");
    removeMarkers();
    intro.innerHTML = "<b>Bäume sind die beste Beschattungsstrategie, die auch Verdunstungskälte bietet.</b><br> Wo werden Ihrer Meinung nach Bäume in der Stadt am meisten gebraucht? <br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen";
    addLogo("/icons/Trees.png")
    createMarkers(15, "#229954");
}

function func8(){
    getMarkerCoordinates("tree");
    removeMarkers();
    intro.innerHTML = "<b>Spielplätze sind ein wichtiges Umfeld für Kinder und junge Familien.</b><br> Wo werden Ihrer Meinung nach Spielplätze am meisten gebraucht? <br><br><b>Verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen";
    addLogo("/icons/playground.png");
    createMarkers(5, "#F4D03F");
}

function func9(){
    getMarkerCoordinates("playground");
    removeMarkers();
    intro.innerHTML = "Gibt es noch etwas, das Ihrer Meinung nach in Burscheid fehlt?<br><br><b>Schreiben Sie den Namen unten und dann verschieben Sie die Markierungen an die gewünschten Stellen. Danach klicken Sie auf die Schaltfläche unten, um zum nächsten Schritt zu gelangen";
    
    logo.src="";

    extraInput = document.createElement("input");
    extraInput.type = "text"; 
    extraInput.id="extra";

    info.appendChild(extraInput);
    createMarkers(5, "#808B96");
}

function func10(){
    getMarkerCoordinates(extraInput.value);
    removeMarkers();
    intro.innerHTML = "Danke für Ihre Teilnahme. Falls Sie wünschen können sie auch einen Kommentar einreichen.";
    extraInput.remove();
    button.remove();

    input1=document.createElement("div");
    input1.id="inputs";
    info.appendChild(input1);

    var age = document.createElement("h");
    age.textContent="Alter"
    var ageInput= document.createElement("input");
    ageInput.type="text";
    ageInput.id="input";

    input2=document.createElement("div");
    input2.id="inputs";
    info.appendChild(input2);

    var gender = document.createElement("h");
    gender.textContent="Geschlecht"
    var genderInput= document.createElement("input");
    genderInput.type="text";
    genderInput.id="input";

    input3=document.createElement("div");
    input3.id="inputs";
    info.appendChild(input3);

    var comment = document.createElement("h");
    comment.textContent="Kommentar"
    var commentInput = document.createElement("input");
    commentInput.type = "text"; 
    commentInput.id="input";


    input1.appendChild(age);
    input1.appendChild(ageInput);
    input2.appendChild(gender);
    input2.appendChild(genderInput);
    input3.appendChild(comment);
    input3.appendChild(commentInput);

    
    var endButton = document.createElement("button");
    endButton.textContent = "Einreichen";
    endButton.id= "button";
    endButton.onclick = () =>{
        intro.innerHTML = "Danke für Ihre Teilnahme. <br> <b>Ihre Daten wurden gesammelt.<b/>";
        endButton.remove();
        input1.remove();
        input2.remove();
        input3.remove();
        console.log(ageInput.value)
        console.log(genderInput.value)
        console.log(commentInput.value)
    }

    info.appendChild(endButton);
}

const funcs = [func1, func2, func3, func4, func5, func6, func7, func8, func9, func10];
let i = 0;
button.addEventListener("click", e => {
    funcs[i]();
    i++;
    if (i >= funcs.length) i = 0;
        
 });
