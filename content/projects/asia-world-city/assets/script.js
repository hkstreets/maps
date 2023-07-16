mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

const bounds = [
    [113.7, 22.12], // Southwest coordinates
    [114.5, 22.60]  // Northeast coordinates
];

const map = new mapboxgl.Map({
    container: "hkstreets-map",
    style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
    center: [114.147, 22.325],
    zoom: 10,
    maxBounds: bounds,
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

const layer = {
    id: "place-layer",
    source: "places",
    type: "circle",
    paint: {
        // The feature-state dependent circle-radius expression will render
        // the radius size according to its magnitude when
        // a feature's hover state is set to true
        "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#cddbe5",
            "#3d5e76"
        ],
        "circle-stroke-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.95,
            0.75
        ],
        "circle-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.80
        ],
        "circle-radius": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            8,
            4
        ],
        "circle-stroke-width":[
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.8,
            0.5
        ],

        // The feature-state dependent circle-color expression will render
        // the color according to its magnitude when
        // a feature's hover state is set to true
        "circle-color": [
            'match',
            ['get', 'region'],
            'Americas',
            '#72E0C1',
            'Asia',
            '#F6F69C',
            'Britain',
            '#A993F6',
            'China',
            '#FF9E92',
            'Europe',
            '#9BCBFF',
            /* other */ '#CDD1DA'
        ]
    }
}




const lineColors = ['#72E0C1', '#F6F69C', '#A993F6', '#FF9E92', '#9BCBFF', '#CDD1DA'];
const layerNames = [
    'Americas',
    'Asia',
    'Britain',
    'China',
    'Europe',
    'Other'
];


const markerHeight = 72;
const markerRadius = 8;
const linearOffset = 25;
const popupOffsets = [0, 0];
const popup = new mapboxgl.Popup({
    offset: popupOffsets,
    className: 'popup',
    closeButton: true,
    closeOnClick: false,
})
    .setHTML("<h1>Hello World!</h1>")
    .setMaxWidth("300px")
    .addTo(map);

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

    // TODO create legend
    createLegend(layerNames)

    // Autoload Sources from /data directory - see map.html for implementation
    for (const [sourceName, source] of Object.entries(sources)) {
        map.addSource(sourceName, source);
    }

    // Add the place layer
    map.addLayer(layer);

    // Add popup interactivity
    let hoverStateID = null;
    map.on('mousemove', 'place-layer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        if (e.features.length > 0) {
            if (hoverStateID) {
                map.removeFeatureState({
                    source: "places",
                    id: hoverStateID
                });
            }

            hoverStateID = e.features[0].id;

            map.setFeatureState(
                {
                    source: "places",
                    id: hoverStateID
                },
                {
                    hover: true
                }
            );
        }


            // Reference place data
        const title = e.features[0].properties.title;
        const description = e.features[0].properties.description;
        const imageUrl = e.features[0].properties.image;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(
            "<h3 class='popupheader'>" + title + "</h3>" +
            "<p>" + description + "</p>" +
            "<img src=" + imageUrl + ">"
        ).addTo(map);

        // TODO Highlight the marker, hover state
        // Ref : https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup#toggleclassname

    })

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
        if (hoverStateID) {
            map.setFeatureState(
                {
                    source: "places",
                    id: hoverStateID
                },
                {
                    hover: false
                }
            );
        }
        hoverStateID = null;
        // Reset the cursor style
        map.getCanvas().style.cursor = "";
    });


});