'use strict';

import PropertyListItem from './PropertyListItem.js';
import PropertyDetailPage from './PropertyDetailPage.js';

class RouteProperty{
	constructor(propertyListItem){
		this.propertyListItem = propertyListItem;
		this.routePop = this.routePop.bind(this);

		//window.addEventListener('DOMContentLoaded', this.routePage);
		//window.addEventListener('hashchange', this.routePage);
	}

	routePage(page = null){
		if (page === null || page === ""){
			this.propertyListItem.getListItems();
			window.history.replaceState(null, null, '/');		// reset window.location.hash
		}
		else{
			//window.history.pushState(null, null, '/'+page);
			console.log('hash changed');
			this.propertyListItem.getListItems(page);
		}	
	}

	routePop(){
		var self = this;
		var path = window.location.hash;
		var id = null;
		var backBtn = document.querySelector('.back-btn');
		var frm = document.querySelector('form');
		//var id = path.split('/').pop();
		//id = Number(id) ? Number(id) : null;
		
		if (path.substring('#')){
			id = path.split('/').pop();
			id = Number(id);
			console.log(id);

			//self.propertyListItem.getListItems(id);
			self.propertyListItem.displayDetails(self.propertyListItem.list[id]);

			if (backBtn.classList.contains('hide')){
				backBtn.classList.remove('hide');	
			}

			if (!frm.classList.contains('hide')){
				frm.classList.add('hide');
			}
		}
		else if (id === null){
			// pageBack() calls below line, results in popstate, call pageBack() again i.e. cyclic calls
			//self.propertyListItem.pageBack();
			self.propertyListItem.getListItems(null);

			//
			if (!backBtn.classList.contains('hide')){
				backBtn.classList.add('hide');	
			}

			if (frm.classList.contains('hide')){
				frm.classList.remove('hide');
			}
		}

		/*if (id === null){
			self.propertyListItem.pageBack();
		}
		else{
			var id = path.split('/').pop();
			id = Number(id) ? Number(id) : null;
			console.log(id);

			//self.propertyListItem.getListItems(id);
			self.propertyListItem.displayDetails(id);
		}*/
	}

}

export default RouteProperty;