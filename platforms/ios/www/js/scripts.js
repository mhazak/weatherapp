/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements.  See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership.  The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License.  You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied.  See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	// var app = {
	//     // Application Constructor
	//     initialize: function() {
	//         this.bindEvents();
	//     },
	//     // Bind Event Listeners
	//     //
	//     // Bind any events that are required on startup. Common events are:
	//     // 'load', 'deviceready', 'offline', and 'online'.
	//     bindEvents: function() {
	//         document.addEventListener('deviceready', this.onDeviceReady, false);
	//     },
	//     // deviceready Event Handler
	//     //
	//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
	//     // function, we must explicitly call 'app.receivedEvent(...);'
	//     onDeviceReady: function() {
	//         app.receivedEvent('deviceready');
	//     },
	//     // Update DOM on a Received Event
	//     receivedEvent: function(id) {
	//         var parentElement = document.getElementById(id);
	//         var listeningElement = parentElement.querySelector('.listening');
	//         var receivedElement = parentElement.querySelector('.received');
	//
	//         listeningElement.setAttribute('style', 'display:none;');
	//         receivedElement.setAttribute('style', 'display:block;');
	//
	//         console.log('Received Event: ' + id);
	//     }
	// };
	//
	// app.initialize();


	'use strict';

	document.addEventListener('DOMContentLoaded', function () {

	    var Weather = {
	        init: function init() {
	            this.cacheDOM();
	            this.bindEvents();
	        },
	        cacheDOM: function cacheDOM() {
	            this.$weatherSearch = document.querySelector('.weather-search');
	            this.$searchWeatherBtn = document.querySelector('#search-weather-btn');
	            this.$searchInput = document.querySelector('.weather-search input');
	            this.$weatherResults = document.querySelector('.weather-results');
	        },
	        bindEvents: function bindEvents() {
	            this.$searchWeatherBtn.addEventListener('click', this.getWeather.bind(this));
	            this.$searchInput.addEventListener('keydown', this.getWeather.bind(this));
	        },
	        render: function render(data) {
	            var template = '<div class="weather-control">City: ' + data.name + '</div>\n                            <div class="weather-control">Tempature: ' + Math.round(data.main.temp) + '</div>\n                            <div class="weather-control">Description: ' + data.weather[0].main + '</div>';
	            this.$weatherResults.innerHTML = template;
	        },
	        getWeather: function getWeather(event) {
	            if (event.keyCode === 13 || event.target.id === 'search-weather-btn') {
	                var iVal = this.$searchInput.value;
	                this.$searchInput.value = '';
	                if (iVal.length === 0) {
	                    return alert('Please search by city name');
	                }
	                getWeatherRequest(iVal.trim());
	            }
	        }
	    };

	    Weather.init();

	    function getWeatherRequest(query) {
	        console.log('request called!');
	        var http = new XMLHttpRequest();
	        var method = 'GET';
	        var url = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=imperial&appid=6f29b0f622d34be28cccf3e08b1dbb4b';

	        http.open(method, url);
	        http.send();
	        http.onreadystatechange = function () {
	            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
	                var data = JSON.parse(http.responseText);
	                console.log('Success');
	                console.log(data);
	                return Weather.render(data);
	            } else if (http.readyState === XMLHttpRequest.DONE) {
	                alert('Something went wrong!');
	            }
	        };
	    }
	});

/***/ }
/******/ ]);
