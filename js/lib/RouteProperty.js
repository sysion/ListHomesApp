'use strict';

import PropertyListItem from './PropertyListItem.js';
import PropertyDetailPage from './PropertyDetailPage.js';

class RouteProperty{
	constructor(property){
		this.property = property;
		this.routes = [];
		this.routeInit = this.routeInit.bind(this);
		this.routeHash = this.routeHash.bind(this);
		this.baseUrl = window.location.origin;
		//window.addEventListener('DOMContentLoaded', this.routeInit);
		window.addEventListener('hashchange', this.routeHash);
	}

	routeInit(){
		
	}

	routeHash(listItem=null){
		//console.log('hash => '+window.location.hash);

		if (! window.location.hash && this.property instanceof PropertyDetailPage){
			var path = '#/' + this.property.currentProperty.id; 
			var url = this.baseUrl + path;
			window.history.pushState({}, '', url);
			this.property.renderListItem();

			let btn = document.querySelector('.back-btn');
			let frm = document.querySelector('form');
			//console.log(btn.classList);
			//console.log('form => '+frm.className);
			btn.classList.toggle('hide');
			//frm.className === 'show' ? frm.className = 'hide' : null;
			frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
		}
		/*else if (! window.location.hash && this.property instanceof PropertyListItem && listItem !== null){
			var path = '#/' + listItem.id; 
			var url = this.baseUrl + path;
			window.history.pushState({}, '', url);
			this.property.renderListItem(listItem);

			let btn = document.querySelector('.back-btn');
			let frm = document.querySelector('form');

			btn.classList.toggle('hide');
			frm.className === 'show' ? frm.className = 'hide' : null;
		}*/
		else{
			var url = this.baseUrl;
			window.history.pushState({}, '', url);
			window.location.href = url;
		}
		
		
	}

	routeAddPath(name, path){
		if (this.routes[name] === 'home' || this.routes[name] === 'page'){
			this.routes[name] = path;
		}
		else{
			this.routes.push({name, path});
		}
	}


}

export default RouteProperty;