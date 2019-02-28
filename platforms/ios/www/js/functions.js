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
'use strict';

document.addEventListener('DOMContentLoaded', function(){
                          
                          
                          const Weather = {
                          init: function() {
                          this.cacheDOM();
                          this.bindEvents();
                          },
                          cacheDOM: function() {
                          this.$weatherSearch = document.querySelector('.weather-search');
                          this.$searchWeatherBtn = document.querySelector('#search-weather-btn');
                          this.$searchInput = document.querySelector('.weather-search input');
                          this.$weatherResults = document.querySelector('.weather-results');
                          },
                          bindEvents: function() {
                          this.$searchWeatherBtn.addEventListener('click', this.getWeather.bind(this));
                          this.$searchInput.addEventListener('keydown', this.getWeather.bind(this));
                          },
                          render: function(data) {
                          var template = `<div class="weather-control">City: ${data.name}</div>
                          <div class="weather-control">Tempature: ${Math.round(data.main.temp)}</div>
                          <div class="weather-control">Description: ${data.weather[0].main}</div>`
                          this.$weatherResults.innerHTML = template;
                          },
                          getWeather: function(event) {
                          if(event.keyCode === 13 || event.target.id === 'search-weather-btn') {
                          let iVal = this.$searchInput.value;
                          this.$searchInput.value = '';
                          if(iVal.length === 0) {
                          return alert('Please search by city name');
                          }
                          getWeatherRequest(iVal.trim());
                          }
                          }
                          }
                          
                          Weather.init();
                          
                          
                          function getWeatherRequest(query) {
                          console.log('request called!');
                          let http = new XMLHttpRequest();
                          let method = 'GET';
                          let url = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=imperial&appid=6f29b0f622d34be28cccf3e08b1dbb4b';
                          
                          http.open(method, url);
                          http.send()
                          http.onreadystatechange = function() {
                          if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                          var data = JSON.parse(http.responseText);
                          console.log('Success');
                          console.log(data);
                          return Weather.render(data);
                          } else if(http.readyState === XMLHttpRequest.DONE) {
                          alert('Something went wrong!');
                          }
                          }
                          }
                          
                          });
