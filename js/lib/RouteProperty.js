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
		window.addEventListener('DOMContentLoaded', this.routeInit);
		window.addEventListener('hashchange', this.routeHash);
	}

	routeInit(){
		if (this.property instanceof PropertyListItem){
			this.routeAddPath('home', '/');
			this.property.renderListItems();
		}
	}

	routeHash(){
		//console.log('hash => '+window.location.hash);

		if (! window.location.hash && this.property instanceof PropertyDetailPage){
			var path = '#/' + this.property.currentProperty.id; 
			var url = this.baseUrl + path;
			window.history.pushState({}, '', url);
			this.property.renderListItem();
		}
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