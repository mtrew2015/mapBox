import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibXRyZXcyMDE1IiwiYSI6ImNrZnhjNmJoNzAzMXkyc3FxNm9jMW03N3QifQ.C99bUzZlNCwVWx5-gvfyQw';

function App() {
	const [ map, setMap ] = useState(null);
	const [ coord, setCoord ] = useState(null);
	const mapContainer = useRef(null);

	const styles = {
		width: '100vh',
		height: '50vh',
		position: 'absolute',
	};

	useEffect(
		() => {
			mapboxgl.accessToken =
				'pk.eyJ1IjoibXRyZXcyMDE1IiwiYSI6ImNrZnhjNmJoNzAzMXkyc3FxNm9jMW03N3QifQ.C99bUzZlNCwVWx5-gvfyQw';

			const initMap = ({ setMap, mapContainer }) => {
				const map = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [ -83.1319027, 39.985 ],
					zoom: 11,
				});

				var grandadsPizza = new mapboxgl.Marker()
					.setLngLat([ -83.1595169, 40.0187752 ])
					.setPopup(new mapboxgl.Popup().setHTML('<h1>Grandads Pizza (sorta)</h1>'))
					.addTo(map);

				map.on('load', () => {
					setMap(map);
					map.resize();
				});

				map.on('move', () => {
					setCoord({
						lng: map.getCenter().lng.toFixed(4),
						lat: map.getCenter().lat.toFixed(4),
						zoom: map.getZoom().toFixed(2),
					});
				});
			};
			if (!map) initMap({ setMap, mapContainer });
		},
		[ map ],
	);

	return (
		<div className='App'>
			<h1>Welcome to Columbus, Ohio</h1>
			<div ref={(el) => (mapContainer.current = el)} style={styles} />
		</div>
	);
}

export default App;
