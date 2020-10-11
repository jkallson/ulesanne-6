(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var dayOrNight = "AM";
            var hourHelper = h;

            if (h >= 12) {
                hourHelper = h -12;
                dayOrNight = "PM"
            }

            if (hourHelper === 0) {
                hourHelper = 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = hourHelper + ":" + m + ":" + s + " "+dayOrNight;
            
        }

    });
    
    // forms
    /*
        <option value="tln">Tallinn</option> <!-- 0€ --->
        <option value="trt">Tartu</option> <!-- 2.5€ --->
        <option value="nrv">Narva</option> <!-- 2.5€ --->
        <option value="prn">P&auml;rnu</option> <!-- 3€ --->

     */
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        const eesnimi = document.getElementById("fname");
        const perenimi = document.getElementById("lname");
        var linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        }
        else if (eesnimi.value === "" || /\d/.test(eesnimi.value)) {
            alert("Eesnimi ei saa olla tühi ning ei tohi sisaldada numbreid");
            eesnimi.focus();
            return;
        }
        else if (perenimi.value === "" || /\d/.test(perenimi.value)) {
            alert("Perenimi ei saa olla tühi ning ei tohi sisaldada numbreid");
            perenimi.focus();
            return;
        }
        else {
            if(linn.value === "tln") e.innerHTML = "0€;";
            else if(linn.value === "trt" || linn.value === "nrv") e.innerHTML = "2.5€";
            else if(linn.value === "prn") e.innerHTML = "3€";
        }        
        
        console.log("Tarne hind on arvutatud");
    }

    document.getElementById("radioButtonForm").addEventListener("submit", paymentMethod);
    function paymentMethod(event) {
        event.preventDefault();

        const pank = document.getElementById("pank").checked;
        const kaart = document.getElementById("kaart").checked;
        const sularaha = document.getElementById("sularaha").checked;

        if(!pank && !kaart && !sularaha) {
            alert("Valige vähemalt üks makseviis");
        }
        else {
            alert("Makseviis valitud!")
        }
    }
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var stadium = new Microsoft.Maps.Location(
        59.421762,
        24.732206
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.887956, 25.541855),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    pushpin.metadata = {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    };

    var pushstadium = new Microsoft.Maps.Pushpin(stadium, {
        title: 'A. Le Coq Arena'
    });

    pushstadium.metadata = {
        title: 'A. Le Coq Arena'
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pushstadium, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pushstadium);

}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    console.log(e.target);
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

