'use strict';

import PropertyDetailPage from './PropertyDetailPage.js';
import RouteProperty from './RouteProperty.js';

class PropertyListItem{
	constructor(property, getPropertyInfo){
		this.property = document.querySelector(property);
		this.getPropertyInfo = getPropertyInfo;
		this.list = {};		//object of objects (local state available inside component's scope)
		this.EventHandler = this.EventHandler.bind(this);
		this.pageBack = this.pageBack.bind(this);

		this.property.addEventListener('click', this.EventHandler);
	}

	getListItems(id = null){
		const self = this;

		if (id === null || id === ""){
			self.getPropertyInfo.getAllProperties().then(function(result){
				result.forEach(function(item){
					self.addListItems(item);
				});

				self.updateTemplate();
			});	
		}
		else{
			self.getPropertyInfo.getProperty(id).then(function(result){
				if (Object.values(self.list).hasOwnProperty(result.id)){
					self.updateTemplate(result);
				}
			});	
		}

		return self.list;
	}

	addListItems(listItemSummary){
		this.list[listItemSummary['id']] = listItemSummary;
	}


	updateTemplate(listItem = null){
		const self = this;

		var listItems = [];
		
		if (! listItem){
			let listItemSummary = Object.values(this.list); 		// get only the values from the object
			
			Array.from(listItemSummary).forEach(function(item){
				var template = self.ListItemTemplate(item);
				listItems.push(template);
			});

			self.renderListItems(self.property, listItems);

			return listItems;
		}
		else{
			var link = document.querySelector('a[href*="'+listItem.id+'"]');
			var template = self.ListItemTemplate(listItem);
			self.renderListItems(self.property, template);

			return listItem;
		}
	}

	ListItemTemplate(listItem){
		return listItem = `<li> 
								<a href='#/${listItem.id}'>
									<div>
								  		<h1>ID: ${listItem.id}</h1>
								  		<h2>Code: ${listItem.code}</h2>
								  		<h3>Agent: ${listItem.agent}</h3>
									</div>
								</a>
							</li>`;
	}

	EventHandler(event){
		event.preventDefault();
		event.stopPropagation();

		const self = this;
		var backBtn = document.querySelector('.back-btn');
		var backBtn2 = document.querySelector('.back-btn2');
		var frm = document.querySelector('form');
		var index;

		backBtn.addEventListener('click', self.pageBack);

		if (event.target.parentNode.localName === 'div'){
			index = event.target.parentNode.parentNode.attributes['href'].value.split('/')[1];
		}
		else if (event.target.parentNode.localName === 'a'){
			index = event.target.parentNode.attributes['href'].value.split('/')[1];
		}
		else if (event.target.localName === 'a'){
			index = event.target.attributes['href'].value.split('/')[1];
		}
	
		Array.from(event.currentTarget.children).forEach(function(li){	// parent ul
			var id = li.firstElementChild.hash.split('/')[1];
			
			if (id === index){
				window.location.hash = '/' + id;

				self.displayDetails(self.list[id]);

				backBtn.classList.remove('hide');
				backBtn2.classList.add('hide');
				
				if (!frm.classList.contains('hide')){
					frm.classList.add('hide');
				}
				
				return;
			}
		});			
	}

	renderListItems(container, listItems){
		container.innerHTML = listItems;
	}

	displayDetails(id){
		var propertyDetailPage = new PropertyDetailPage('#property');
		propertyDetailPage.addListItem(id);		// update model and re-render
	}

	pageBack(){
		const self = this;
		var backBtn = document.querySelector('.back-btn');
		var frm = document.querySelector('form');

		window.history.back();			// this will trigger popstate hence no need for next line
		self.getListItems(null);

		if (!backBtn.classList.contains('hide')){
			backBtn.classList.add('hide');	
		}

		if (frm.classList.contains('hide')){
			frm.classList.remove('hide');
		}
	}

}

export default PropertyListItem;