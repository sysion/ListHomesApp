'use strict';

import PropertyListItem from './PropertyListItem.js';

class RouteProperty{
	constructor(propertyListItem){
		this.propertyListItem = propertyListItem;
		this.routePop = this.routePop.bind(this);
	}

	routePage(page = null){
		if (page === null || page === ""){
			this.propertyListItem.getListItems();
			window.history.replaceState(null, null, '/');		// reset window.location.hash
		}
		else{
			this.propertyListItem.getListItems(page);
		}	
	}

	routePop(){
		var self = this;
		var path = window.location.hash;
		var id = null;
		var backBtn = document.querySelector('.back-btn');
		var frm = document.querySelector('form');
		
		if (path.substring('#')){
			id = path.split('/').pop();
			id = Number(id);

			self.propertyListItem.displayDetails(self.propertyListItem.list[id]);

			if (backBtn.classList.contains('hide')){
				backBtn.classList.remove('hide');	
			}

			if (!frm.classList.contains('hide')){
				frm.classList.add('hide');
			}
		}
		else if (id === null){
			self.propertyListItem.getListItems(null);

			if (!backBtn.classList.contains('hide')){
				backBtn.classList.add('hide');	
			}

			if (frm.classList.contains('hide')){
				frm.classList.remove('hide');
			}
		}
	}

}

export default RouteProperty;