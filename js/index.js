'use strict';

import PropertyDetailPage from './lib/PropertyDetailPage.js';
import PropertyListItem from './lib/PropertyListItem.js';
import GetPropertyInfo from './lib/GetPropertyInfo.js';
import RouteProperty from './lib/RouteProperty.js';

;(()=>{
	let backBtn = document.querySelector('.back-btn');
	let backBtn2 = document.querySelector('.back-btn2');
	let frm = document.querySelector('form');
	let id = document.querySelector('input[name="id"]');
	let search = document.querySelector('button[name="search"]');
	let footer_p = document.querySelector('footer > p');

	//let state = {};			//object of objects (global state - not proper for component design)
	let getPropertyInfo = new GetPropertyInfo();
	let propertyListItem = new PropertyListItem('#property', getPropertyInfo);
	let propertyDetailPage = new PropertyDetailPage('#property');
	let routeProperty = new RouteProperty(propertyListItem);

	//let db = propertyListItem.getListItems();

	search.addEventListener('click', findHouse);
	backBtn2.addEventListener('click', pageBack);

	footer_p.innerHTML = '&copy;' + new Date().getFullYear() + ' Sysion Nigeria Ltd';

	function findHouse(e){
		e.preventDefault();		
		e.stopPropagation();

		var index = Number(id.value.trim()) ? parseInt(id.value.trim()) : 0;
		propertyListItem.getListItems(index);
		id.value = "";
		backBtn2.classList.remove('hide');
	}

	function pageBack(e){
		const self = this;
		
		console.log('one page back');
		window.history.back();
		propertyListItem.getListItems();

		backBtn2.classList.add('hide');

		//frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
	}

	//window.history.replaceState(null, null, '/');		// reset window.location.hash
	//var page = window.location.hash;
	//console.log('page = ' + page);

	window.addEventListener('DOMContentLoaded', routeProperty.routePage());
	//window.addEventListener('hashchange', routeProperty.routePage(page));
	window.addEventListener('popstate', routeProperty.routePop);

	// serviceWorker code
	if (! navigator.serviceWorker.controller) {		//https or localhost required for serviceWorker
	    if (navigator && navigator.serviceWorker) {
	      window.addEventListener('load', () => {
	        navigator.serviceWorker.register('../serviceWorker.js').then((registration) => {
	          //registration was successful
	          console.log('ServiceWorker registration successful with scope: ', registration.scope);
	        }, function(err) {
	          //registration failed
	          console.log('ServiceWorker registration failed: ', err);
	        });
	      });
	    }
	}

})();