'use strict';

function config ($locationProvider) {
	$locationProvider.html5Mode(true);
}

config.$inject = ['$locationProvider'];

angular
	.module('PoopHaikus', ['ui.router'])
	.config(config);