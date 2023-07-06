// mapboxgl.accessToken =
//     "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

// const bounds = [
//     [113.8, 22.13], // Southwest coordinates
//     [114.5, 22.57] // Northeast coordinates
// ];

// const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
//     center: [114.147, 22.325],
//     zoom: 10.7,
//     maxBounds: bounds
// });

// map.on("load", () => {
    // Add Asia datasource

    // map.addSource("asia", {
    //     type: "geojson",
    //     data: "https://raw.githubusercontent.com/hkstreets/maps/2408e9416895c92b57f00a2e6b490bf20689f121/asia.geojson",
    //     generateId: true // This ensures that all features have unique IDs
    // });

    // // Add Asia as a layer and style it
    // map.addLayer({
    //     id: "asia-layer",
    //     type: "circle",
    //     source: "asia",
    //     paint: {
    //         // The feature-state dependent circle-radius expression will render
    //         // the radius size according to its magnitude when
    //         // a feature's hover state is set to true
    //         "circle-stroke-color": "#1C2B36",
    //         "circle-opacity": [
    //             "case",
    //             ["boolean", ["feature-state", "hover"], false],
    //             1,
    //             0.65
    //         ],
    //         "circle-radius": [
    //             "case",
    //             ["boolean", ["feature-state", "hover"], false],
    //             6,
    //             4
    //         ],
    //         "circle-stroke-width": 0.5,
    //         // The feature-state dependent circle-color expression will render
    //         // the color according to its magnitude when
    //         // a feature's hover state is set to true
    //         "circle-color": [
    //             "case",
    //             ["boolean", ["feature-state", "hover"], false],
    //
    //             "#fff",
    //             "#ff7eb6"
    //         ]
    //     }
    // });

    // const popupAsia = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false,
    //     className: "popup"
    // });

    let hoverStateID = null;

    map.on("mousemove", "asia-layer", (event) => {
        map.getCanvas().style.cursor = "pointer";

        if (event.features.length > 0) {
            if (hoverStateID) {
                map.removeFeatureState({
                    source: "asia",
                    id: hoverStateID
                });
            }

            hoverStateID = event.features[0].id;

            map.setFeatureState(
                {
                    source: "asia",
                    id: hoverStateID
                },
                {
                    hover: true
                }
            );
        }

        popupAsia
            .setLngLat(event.lngLat)
            .setHTML(
                event.features[0].properties.title +
                event.features[0].properties.description +
                event.features[0].properties.imagelink
            )
            .addTo(map);
    });

    map.on("mouseleave", "asia-layer", () => {
        popupAsia.remove();
        if (hoverStateID) {
            map.setFeatureState(
                {
                    source: "asia",
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


    //end
});


