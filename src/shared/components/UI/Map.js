import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MapStyles = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
    new window.google.maps.Marker({
      position: center,
      map: map
    })
  }, [center, zoom])
  
  return (
    <MapStyles
      ref={mapRef}
      className={props.className}
      style={props.style}
    />
  );
};

export default Map;
