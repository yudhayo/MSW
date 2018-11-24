var base_url = document.location.host;

document.addEventListener("DOMContentLoaded", (e) => {
    buatKonten();
    lokasiPeta();
});

buatKonten = () => {
    const container = document.getElementById("container-maps");
    container.className = "container-maps";

    const menu = document.createElement("div");
	menu.className = "menu-kal";
    container.append(menu);
    
    const footer = document.getElementById("footer-sub");
	footer.className = "footer-sub";

		const link1 = document.createElement("a");
		link1.href = "/";
		menu.append(link1);

			const menu_link1 = document.createElement("img");
			menu_link1.src = "../images/icon.png";
			menu_link1.alt = "icon"
			menu_link1.width = "55";
			menu_link1.height = "55";
			link1.append(menu_link1);
    
    const konten = document.getElementById("konten");
    konten.className = "konten-peta";

        const peta = document.createElement("div");
        peta.id = "peta";
        peta.className = "peta";
        konten.append(peta);

        const tempat_gambar = document.createElement("div");
        tempat_gambar.id = "tempat-gambar"
        tempat_gambar.className = "tempat-gambar";
        tempat_gambar.innerHTML = "Gambar disini";
        konten.append(tempat_gambar);

        const tempat_review = document.createElement("div")
        tempat_review.id = "tempat-review";
        tempat_review.className = "tempat-review";
        tempat_review.innerHTML = "Reviewnya nanti disini";
        konten.append(tempat_review);


        footer.append(innerHTML = "Yudha Hermawan - MWS Spesialist");
}

lokasiPeta = () => {
    peta = L.map("peta", {
        center: [-2.3198179, 120.419005],
        zoom: 4,
        scrollWheelZoom: false
    });

    var circle = "";
    
    // Mapbox //
    let mapboxToken = CONFIG.mapBoxToken();

    L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token=${mapboxToken}`, {
        maxZoom: 18,
        attribution:
            "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, "+
            "<a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, "+
            "Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>, "+
            "Yudha Hermawan",
        id: "mapbox.streets"
    }).addTo(peta);

    var markersLayer = new L.LayerGroup();
    peta.addLayer(markersLayer);

    DBHelper.ambilRestoran((error, restoran) => {
        if(error){
            alert(`koordinat gagal dimuat, pesan error '${error}'`);
        }
        else {
            Array.from(restoran).forEach((e) => {
                let marker = new L.marker(e.latlng, {
                    title: e.nama,
                    bubblingMouseEvent: true
                }).addEventListener("click", () => {
                    if(peta.getZoom() < 15){
                        peta.setView(e.latlng, 15);
                    }
                    else {
                        peta.setView(e.latlng);
                    }

                    if(circle === ""){
                        circle = L.circleMarker(e.latlng).addTo(peta);
                    }
                    else {
                        circle.setLatLng(e.latlng);
                    }

                    tampilDataRestoran(e.id);
                });
        
                markersLayer.addLayer(marker);
            });
        }
    });
}

tampilDataRestoran = (id) => {
    DBHelper.ambilRestoranByID(id, (error, restoran) => {
        if(error){
            alert(`Gagal mengambil gambar dengan status '${error}'`);
        }
        else {
            const tempat_review = document.getElementById("tempat-review");
            tempat_review.innerHTML =
                `<b>Nama tempat : ${restoran[0].nama}</b> <br/>`+
                `<br/><hr>`+
                `<br/>Review :<br/>`+
                `${restoran[0].review}`+
                `<br/><br/>Harga :<br/>`+
                `${restoran[0].harga}`
                ;

            const tempat_gambar = document.getElementById("tempat-gambar");
            tempat_gambar.innerHTML = "";

                const gambar = document.createElement("img");
                gambar.className = "gambar-peta";
                gambar.src = `../images/${restoran[0].gambar}`;
                tempat_gambar.append(gambar);

                const footer = document.createElement("div");
                footer.className = "footer-peta";
                footer.innerHTML = "<small>*Sumber Gambar By Google Image</small>";
                tempat_gambar.append(footer);
        }
    });
}