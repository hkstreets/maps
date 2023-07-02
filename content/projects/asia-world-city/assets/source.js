mapboxgl.accessToken =
    "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

const bounds = [
    [113.755, 22.13], // Southwest coordinates
    [114.5, 22.57] // Northeast coordinates
];

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
    center: [114.18, 22.285],
    zoom: 10,
    minZoom: 10,
    maxZoom: 14.5,
    maxBounds: bounds
});

map.on("load", () => {
    // define layer names
    const layers = ["Asia", "Europe", "UK", "US"];
    const colors = ["#ff7eb6", "#33b1ff", "#B384B9", "#6fdc8c"];

    // create legend
    const legend = document.getElementById("legend");

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement("div");
        const key = document.createElement("span");
        key.className = "legend-key";
        key.style.backgroundColor = color;

        const value = document.createElement("span");
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });

    // Add asia
    map.addSource("asia", {
        type: "geojson",
        data:
            "https://raw.githubusercontent.com/Pangdi311/hkstreets/main/asia.geojson"
    });

    map.addLayer({
        source: "asia",
        id: "asia-layer",
        type: "circle",
        paint: {
            "circle-color": "#ff7eb6",
            "circle-radius": 3,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 0.8,
            "circle-stroke-opacity": 0.4
        }
    });

    // Add europe
    map.addSource("europe", {
        type: "geojson",
        data:
            "https://raw.githubusercontent.com/Pangdi311/hkstreets/main/europe.geojson"
    });

    map.addLayer({
        source: "europe",
        id: "europe-layer",
        type: "circle",
        paint: {
            "circle-color": "#33b1ff",
            "circle-radius": 3,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 0.8,
            "circle-stroke-opacity": 0.4
        }
    });

    // Add uk
    map.addSource("uk", {
        type: "geojson",
        data:
            "https://raw.githubusercontent.com/Pangdi311/hkstreets/main/uk.geojson"
    });

    map.addLayer({
        source: "uk",
        id: "uk-layer",
        type: "circle",
        paint: {
            "circle-color": "#8a3ffc",
            "circle-radius": 3,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 0.8,
            "circle-stroke-opacity": 0.4
        }
    });

    // Add us
    map.addSource("us", {
        type: "geojson",
        data:
            "https://raw.githubusercontent.com/Pangdi311/hkstreets/main/us.geojson"
    });

    map.addLayer({
        source: "us",
        id: "us-layer",
        type: "circle",
        paint: {
            "circle-color": "#6fdc8c",
            "circle-radius": 3,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 0.8,
            "circle-stroke-opacity": 0.4
        }
    });
    //add labels for asia
    const popupmix = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "popup"
    });

    map.on("mouseenter", "asia-layer", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Populate the popup and set its coordinates
        // based on the feature found.
        popupmix
            .setLngLat(e.lngLat)
            .setHTML(
                e.features[0].properties.title +
                e.features[0].properties.description +
                e.features[0].properties.imagelink
            )
            .addTo(map);
    });

    map.on("mouseleave", "asia-layer", () => {
        map.getCanvas().style.cursor = "";
        popupmix.remove();
    });

    //add labels for europe
    const popupchi = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "popup"
    });

    map.on("mouseenter", "europe-layer", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Populate the popup and set its coordinates
        // based on the feature found.
        popupchi
            .setLngLat(e.lngLat)
            .setHTML(
                e.features[0].properties.title +
                e.features[0].properties.description +
                e.features[0].properties.imagelink
            )
            .addTo(map);
    });

    map.on("mouseleave", "europe-layer", () => {
        map.getCanvas().style.cursor = "";
        popupchi.remove();
    });

    //add labels for meaning
    const popupeng = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "popup"
    });

    map.on("mouseenter", "uk-layer", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Populate the popup and set its coordinates
        // based on the feature found.
        popupeng
            .setLngLat(e.lngLat)
            .setHTML(
                e.features[0].properties.title +
                e.features[0].properties.description +
                e.features[0].properties.imagelink
            )
            .addTo(map);
    });

    map.on("mouseleave", "uk-layer", () => {
        map.getCanvas().style.cursor = "";
        popupeng.remove();
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "popup"
    });

    map.on("mouseenter", "us-layer", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
            .setLngLat(e.lngLat)
            .setHTML(
                e.features[0].properties.title +
                e.features[0].properties.description +
                e.features[0].properties.imagelink
            )
            .addTo(map);
    });

    map.on("mouseleave", "us-layer", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
    });
});
