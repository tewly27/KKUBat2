var map;
// import Config from "./config.json";

function init() {
  map = new longdo.Map({
    placeholder: document.getElementById('map'),
    language: 'en'
  });
  // var marker = new longdo.Marker({ lat: 16.457048, lon: 102.820435 });
  // map.location({ lat: 16.457048, lon: 102.820435 }, true);
  // map.Overlays.add(marker);
}

