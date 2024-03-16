const classNames = `.leaflet-control-container .leaflet-top,
.leaflet-control-container .leaflet-bottom {
  transform: translate3d(0px, 0px, 0px);
}
.leaflet-container {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.leaflet-control {
  z-index: 0 !important;
}
.leaflet-pane {
  z-index: 0 !important;
}
.leaflet-top,
.leaflet-bottom {
  z-index: 0 !important;
}`;

const generateStyles = () => {
  const style = document.createElement("style");
  style.textContent = classNames;
  document.head.appendChild(style);
};

export default generateStyles;
