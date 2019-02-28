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


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
     the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
                         var a, b, i, val = this.value;
                         /*close any already open lists of autocompleted values*/
                         closeAllLists();
                         if (!val) { return false;}
                         currentFocus = -1;
                         /*create a DIV element that will contain the items (values):*/
                         a = document.createElement("DIV");
                         a.setAttribute("id", this.id + "autocomplete-list");
                         a.setAttribute("class", "autocomplete-items");
                         /*append the DIV element as a child of the autocomplete container:*/
                         this.parentNode.appendChild(a);
                         /*for each item in the array...*/
                         for (i = 0; i < arr.length; i++) {
                         /*check if the item starts with the same letters as the text field value:*/
                         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                         /*create a DIV element for each matching element:*/
                         b = document.createElement("DIV");
                         /*make the matching letters bold:*/
                         b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                         b.innerHTML += arr[i].substr(val.length);
                         /*insert a input field that will hold the current array item's value:*/
                         b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                         /*execute a function when someone clicks on the item value (DIV element):*/
                         b.addEventListener("click", function(e) {
                                            /*insert the value for the autocomplete text field:*/
                                            inp.value = this.getElementsByTagName("input")[0].value;
                                            /*close the list of autocompleted values,
                                             (or any other open lists of autocompleted values:*/
                                            closeAllLists();
                                            });
                         a.appendChild(b);
                         }
                         }
                         });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
                         var x = document.getElementById(this.id + "autocomplete-list");
                         if (x) x = x.getElementsByTagName("div");
                         if (e.keyCode == 40) {
                         /*If the arrow DOWN key is pressed,
                          increase the currentFocus variable:*/
                         currentFocus++;
                         /*and and make the current item more visible:*/
                         addActive(x);
                         } else if (e.keyCode == 38) { //up
                         /*If the arrow UP key is pressed,
                          decrease the currentFocus variable:*/
                         currentFocus--;
                         /*and and make the current item more visible:*/
                         addActive(x);
                         } else if (e.keyCode == 13) {
                         /*If the ENTER key is pressed, prevent the form from being submitted,*/
                         e.preventDefault();
                         if (currentFocus > -1) {
                         /*and simulate a click on the "active" item:*/
                         if (x) x[currentFocus].click();
                         }
                         }
                         });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
         except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
                              closeAllLists(e.target);
                              });
}
