document.addEventListener("DOMContentLoaded", (e) => {
    createContent();
});

createContent = () => {
    const container = document.getElementById("container");
    container.className = "container";

        const menu = document.createElement("div");
        menu.className = "menu";
        container.append(menu);

            const menu_img = document.createElement("img");
            menu_img.src = "images/icon.png";
            menu_img.alt = "icon"
            menu_img.height = "55";
            menu_img.width = "55";
            menu.append(menu_img);

        const sidebar = document.createElement("div");
        sidebar.className = "sidebar";
        container.append(sidebar);

            const sidebar_img = document.createElement("img");
            sidebar_img.src = "images/dirisendiri.jpg";
            sidebar_img.alt = "foto sendiri";
            sidebar.append(sidebar_img);

        const konten1 = document.createElement("div");
        konten1.className = "konten";
        konten1.innerHTML = "Menjumlahkan 2 angka";
        container.append(konten1);

        const konten2 = document.createElement("div");
        konten2.className = "konten";
        konten2.innerHTML = "Lokasi istimewa dengan mapbox";
        container.append(konten2);

        const footer = document.createElement("footer");
        footer.className = "footer";
        container.append(footer);

            const link1 = document.createElement("a");
            link1.target = "__blank";
            link1.href = "https://linkedin.com/in/yudha-hermawan-919128107/";
            link1.title = "Linkedin";
            footer.append(link1);

                const img_link1 = document.createElement("img");
                img_link1.src = "images/LinkedIN.png";
                img_link1.alt = "LinkedIn";
                img_link1.width = "35";
                img_link1.height = "30";
                link1.append(img_link1);

            const link2 = document.createElement("a");
            link2.target = "__blank";
            link2.href = "https://github.com/yudhayo";
            link2.title = "Linkedin";
            footer.append(link2);

                const img_link2 = document.createElement("img");
                img_link2.src = "images/GitHub-black.png";
                img_link2.alt = "GitHub";
                img_link2.width = "30";
                img_link2.height = "30";
                link2.append(img_link2);

footer.append(innerHTML = "Yudha Hermawan");
}