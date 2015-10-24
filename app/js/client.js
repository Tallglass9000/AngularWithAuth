require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var beveragesApp = angular.module('beveragesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(beveragesApp);
require('./filters/filters')(beveragesApp);
require('./directives/directives')(beveragesApp);
require('./beverages/beverages')(beveragesApp);
require('./users/users')(beveragesApp);
require('./logout')(beveragesApp);
require('./router')(beveragesApp);

