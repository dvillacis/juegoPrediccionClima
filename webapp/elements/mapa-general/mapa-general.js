Polymer('mapa-general', {
	
	ready: function() {
		this.page = 0;
		this.selected_region = '';
		this.selected_provincia = '';
		this.selected_capital = '';

		// Defino los numeros de las provincias
		var provincias = {};

		L.Icon.Default.imagePath = "../../images";
		//var map = L.map(this.$.map).setView([39.74739, -105], 13);
		var map = L.map(this.$.map).setView([-1.6, -78.5], 8);

		var pages = this.$.pages;

		// Desactivando algunos hanlders
		map.dragging.disable();
		map.scrollWheelZoom.disable();

		// control that shows state info on hover

		function update (props) {
			if ( props ) {
				document.querySelector('mapa-general').selected_region = props.region;
				document.querySelector('mapa-general').selected_provincia = props.provincia;
				document.querySelector('mapa-general').selected_capital = props.capital;
				console.log(document.querySelector('mapa-general').selected_provincia);
			}
		};

		function style(feature) {
			return {
				fillColor: '#FEB24C',
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7
			};
		}

		function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 4,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7,
				fillColor: '#666'
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			update();
		}

		function seleccionarProvincia(e) {
			var provincia_seleccionada = e.target.feature;
			pages.selected = provincia_seleccionada.id + 1;
			// this.page = 1;
			console.log("Current page: " + pages.selected);
			//map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: seleccionarProvincia
			});
		}

		geojson = L.geoJson(ecData, 
			{	
				style:style,
				onEachFeature:onEachFeature	
			}).addTo(map);

		map._onResize();
		
		console.log("mapa listo");
	}
});








