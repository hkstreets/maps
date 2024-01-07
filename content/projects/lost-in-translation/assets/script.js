mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

const bounds = [
    [113.8, 22.18], // Southwest coordinates
    [114.5, 22.57] // Northeast coordinates
];

const map = new mapboxgl.Map({
    container: "hkstreets-map",
    style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
    center: [114.18, 22.285],
    zoom: 12,
    maxBounds: bounds
});

const lineColors = ["#8a3ffc", "#08bdba", "#bae6ff", "#ff7eb6"];
const layerNames = [
    "Transliteration (Sound)",
    "Translation (Meaning)",
    "Miscellaneous",
    "Mixed (Sound + Meaning)"
];

const layers = {
    sound: {
        id: "sound-layer",
        source: "transliteration",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#8a3ffc",
            "line-width": 1,
            "line-opacity": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#a468fd; margin-top:0px">Sound</p></strong>' +
                e.features[0].properties.name
        }
    },
    meaning: {
        source: "translation",
        id: "meaning-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": " #08bdba",
            "line-width": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#08bdba; margin-top:0px">Meaning</p></strong>' +
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
            "line-color": "#ff7eb6",
            "line-width": 1
        },
        getHTML: function (e) {
            return '<strong><p style="color:#ff7eb6; margin-top:0px">Mixed</p></strong>' +
                e.features[0].properties.name
        }
    },
    misc: {
        source: "misc",
        id: "misc-layer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#bae6ff",
            "line-width": 1
        },
        getHTML: function (e) {
            return e.features[0].properties.heading + "<br>" +
                e.features[0].properties.name + "<br><br>" +
                e.features[0].properties.description
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

const fixHeight = (height) => {
    let e = document.getElementById("hkstreets-map");
    e.style.height = height;
}

map.on("load", () => {

    // create legend
    createLegend(layerNames);

    // Hack : Resize map once correct height of container is set.
    fixHeight("840px");

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
            map.getCanvas().style.cursor = "pointer";
            popupCommon
                .setLngLat(e.lngLat)
                .setHTML(layer.getHTML(e))
                .addTo(map);
        });
    }
    map.resize();
});
