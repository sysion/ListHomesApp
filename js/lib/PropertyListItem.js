'use strict';

import PropertyDetailPage from './PropertyDetailPage.js';
import GetPropertyInfo from './GetPropertyInfo.js';
import RouteProperty from './RouteProperty.js';

class PropertyListItem{
	constructor(property){
		this.property = document.querySelector(property);

		//state i.e. data our app currently has access to; example data {id:16,code:"house-17",agent:"Danladi Zubair"}
		this.list = {};		//object of objects

		/*/ get all defined class methods
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

		// bind all methods
		methods.filter(function(method){
			method !== 'constructor';
		}).forEach(function(method){
			this[method] = this[method].bind(this);
		});*/

		/*this.addListItems = this.addListItems.bind(this);
		this.renderListItems = this.renderListItems.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
		this.ListItemTemplate = this.ListItemTemplate.bind(this);
		this.EventHandler = this.EventHandler.bind(this);*/

		//Object.assign(this, {addListItems, renderListItems, renderListItem, ListItemTemplate, EventHandler});
	}

	addListItems(listItemSummary){
		this.list[listItemSummary['id']] = listItemSummary;
		//console.log(this.list);
	}

	renderListItems(){
		let listItems = [];
		let idLinks = [];
		
		let listItemSummary = Object.values(this.list); // get only the values from the object
		//console.log(listItemSummary);

		/* save reference to 'this' (i.e. this class) and used $this where errors are thrown below.
		   arrow functions do not have issue of 'this' undefined*/
		var $this = this;	
		//console.log($this);

		Array.from(listItemSummary).forEach(function(item){
			//console.log(listItemSummary);
			//debugger;   // this triggers debugging
			listItems.push($this.ListItemTemplate(item));	// Uncaught (in promise) Typeerror: 'this' is undefined
			idLinks.push(item.id);
		});

		//console.log(listItems);
		this.property.innerHTML = listItems.join('');

		//add EventListeners
		idLinks.forEach(function(item){
			var link = document.querySelector('a[href*="'+item+'"]');
			var itemSummary;

			const getPropertyInfo = new GetPropertyInfo(item);

			//Because getAllPropertys() is async, all action on the returned value MUST be done inside the THEN callback
			getPropertyInfo.getProperty().then(function(result){
				//console.log(result.id);
				if (item == result.id){
					itemSummary = result;
					$this.EventHandler(link, itemSummary);		// Uncaught (in promise) Typeerror: 'this' is undefined
				}
			});	

		});
	}

	renderListItem(listItem){
		this.property.innerHTML = this.ListItemTemplate(listItem);
	}

	ListItemTemplate(listItem){
		return listItem = `<li> 
								<a href='#/${listItem.id}'>
									<div>
								  		<h1>id: ${listItem.id}</h1>
								  		<h2>code: ${listItem.code}</h2>
								  		<h3>agent: ${listItem.agent}</h3>
									</div>
								</a>
							</li>`;
	}

	EventHandler(link, listItem){
		//console.log(link);
	
		link.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			//console.log('hello');
			let propertyDetailPage = new PropertyDetailPage('#property');
			let routeProperty = new RouteProperty(propertyDetailPage);
			propertyDetailPage.addListItem(listItem);		// update model
			//propertyDetailPage.renderListItem();			// render view

			//var path = '#/' + listItem.id;
			//routeProperty.routeAddPath('page', path);
			routeProperty.routeHash();						// render view
		});
	}

}

export default PropertyListItem;