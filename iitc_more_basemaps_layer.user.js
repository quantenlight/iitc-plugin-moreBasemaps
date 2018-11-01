// ==UserScript==
// @id              iitc-plugin-more-basemaps@Quantenstorm
// @name            IITC plugin: More basemaps
// @category        Map Tiles
// @version         1.0.1
// @description     Add OpenStreetMap and Maptoolkit Layer
// @updateURL	    https://github.com/quantenlight/iitc-plugin-moreBasemaps/raw/master/iitc_more_basemaps_layer.user.js
// @downloadURL     https://github.com/quantenlight/iitc-plugin-moreBasemaps/raw/master/iitc_more_basemaps_layer.user.js
// @match           /^https?:\/\/intel.ingress\.com.*/
// @include         /^https?:\/\/intel.ingress\.com.*/
// @grant           none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

var setup = function(){
	var osmStdAttr = '<a href="http://leafletjs.com/">Leaflet</a> &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> - Map Data: <a href="https://www.openstreetmap.org/copyright">OSM Contributors</a> - <a href="https://www.maptoolkit.net/improvemap">Improve this map</a>';
	var osmStdUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmStdLayer = new L.TileLayer(osmStdUrl, {attribution:osmStdAttr, maxNativeZoom: 19, maxZoom: 40});
	layerChooser.addBaseLayer(osmStdLayer, 'OpenStreetMap');

    var maptoolkitAttr = '<a href="http://leafletjs.com/">Leaflet</a> &copy; <a href="https://www.toursprung.com/">Toursprung GmbH</a> - Map Data: <a href="https://www.openstreetmap.org/copyright">OSM Contributors</a> - <a href="https://www.maptoolkit.net/improvemap">Improve this map</a>';
    var maptoolkitUrl = 'https://tile3.maptoolkit.net/terrain/{z}/{x}/{y}.png';
    var maptoolkitLayer = new L.TileLayer(maptoolkitUrl, {attribution:maptoolkitAttr, maxNativeZoom: 18, maxZoom: 40});
    layerChooser.addBaseLayer(maptoolkitLayer, 'Maptoolkit');
};

// PLUGIN END ////////////////////////////////////////////////////////
setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
