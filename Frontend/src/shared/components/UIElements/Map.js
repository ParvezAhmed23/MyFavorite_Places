import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef(null);

  const { center, zoom } = props;

  useEffect(() => {
    // Create a new marker feature
    let marker = new window.ol.Feature({
      geometry: new window.ol.geom.Point(
        window.ol.proj.fromLonLat([center.lng, center.lat])
      )
    });

    // Create a new marker style
    let markerStyle = new window.ol.style.Style({
      image: new window.ol.style.Circle({
        radius: 10,
        fill: new window.ol.style.Fill({ color: '#fff' }),
        stroke: new window.ol.style.Stroke({
          color: [255, 56, 96],
          width: 5
        })
      })
    });

    // Apply the marker style to the marker feature
    marker.setStyle(markerStyle);

    // Create a new vector layer for the marker
    const markerLayer = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [marker]
      })
    });

    // Create a new map object
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        }),
        markerLayer
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });

    // Return a function to clean up the map object when the component unmounts
    return () => {
      map.setTarget(null);
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
