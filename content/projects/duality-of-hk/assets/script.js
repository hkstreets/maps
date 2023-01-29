mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

const bounds = [
    [113.7, 22.18], // Southwest coordinates
    [114.5, 22.57]  // Northeast coordinates
];

const map = new mapboxgl.Map({
    container: "hkstreets-map",
    style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
    center: [114.18, 22.285],
    zoom: 12,
    maxBounds: bounds
});

const lineColors = ["#33b1ff", "#d2a106", "#6fdc8c", "#d12771"];
const layerNames = ["Sino-Tibetan", "Indo-European", "Mixed/Others", "1888 European District Ordinance"];

const layers = {
    sino: {
        source: "sino",
        id: "sino-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#33b1ff",
            "line-width": 1,
            "line-opacity": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#33b1ff; margin-top:0px">Chinese</p></strong>' +
                e.features[0].properties.name
        }
    },
    eur: {
        source: "eur",
        id: "eur-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": " #d2a106",
            "line-width": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#d2a106; margin-top:0px">English</p></strong>' +
                e.features[0].properties.name
        }
    },
    mixed: {
        source: "mixed",
        id: "mixed-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#6fdc8c",
            "line-width": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#6fdc8c; margin-top:0px">Mixed</p></strong>' +
                e.features[0].properties.name
        }
    },
    edo: {
        source: "edo",
        id: "edo-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#d12771",
            "line-width": 2
        }
    }
}

const invisiblePaint = {
    "line-width": 5,
    "line-opacity": 0
}

const createLegend = () => {
    const legend = document.getElementById("hkstreets-legend");
    layerNames.forEach((layer, i) => {
        const color = lineColors[i];
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
}

map.on("load", () => {

    // create legend
    createLegend(layerNames)

    // Add Sources
    for (const [sourceName, source] of Object.entries(sources)) {
        map.addSource(sourceName, source);
    };

    for (const [layerName, layer] of Object.entries(layers)) {
        map.addLayer(layer);
        map.addLayer({
            ...layer, ...{
                id: `${layer.id}-invisible`,
                paint: {...layer.paint, ...invisiblePaint}
            }
        });
    }

    const popupCommon = new mapboxgl.Popup({
        closeButton: false,
        className: "popup"
    });

    for (const [layerName, layer] of Object.entries(layers)) {
        map.on("mouseenter", `${layer.id}-invisible`, (e) => {
            map.getCanvas().style.cursor = "";
            popupCommon.remove();

            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = "pointer";
            popupCommon
                .setLngLat(e.lngLat)
                .setHTML(layer.getHTML(e))
                .addTo(map);
        });
    }
});

map.addControl(new mapboxgl.NavigationControl());
