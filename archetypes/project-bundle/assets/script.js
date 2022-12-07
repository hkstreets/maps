mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbmczMTEiLCJhIjoiY2tidmNld2cyMDA5djJwbXYzZjZsNTB0OSJ9.hvW536UZKn2wDDH6yDjJ2g";

const bounds = [
    [113.7, 22.18], // Southwest coordinates
    [114.5, 22.57]  // Northeast coordinates
];

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dpang311/ck21xo59h0cht1cmm2wjrmoki",
    center: [114.18, 22.285],
    zoom: 12,
    maxBounds: bounds
});