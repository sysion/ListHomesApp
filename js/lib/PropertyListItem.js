'use strict';

import PropertyDetailPage from './PropertyDetailPage.js';
import RouteProperty from './RouteProperty.js';

class PropertyListItem{
	constructor(property, getPropertyInfo){
		this.property = document.querySelector(property);
		this.getPropertyInfo = getPropertyInfo;
		this.list = {};		//object of objects (local state available inside component's scope)
		this.EventHandler = this.EventHandler.bind(this);
		//this.getListItems = this.getListItems.bind(this);
		this.pageBack = this.pageBack.bind(this);
		//this.pageBack2 = this.pageBack2.bind(this);
		
		/*/ This is ok, but moved to EventHandler()
		this.property.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			var index;
			var self = this;
			
			if (e.target.parentNode.localName === 'div'){
				index = e.target.parentNode.parentNode.attributes['href'].value.split('/')[1];
			}
			else if (e.target.parentNode.localName === 'a'){
				index = e.target.parentNode.attributes['href'].value.split('/')[1];
			}
			else if (e.target.localName === 'a'){
				index = e.target.attributes['href'].value.split('/')[1];
			}
		
			Array.from(e.currentTarget.children).forEach(function(li){	//parent ul
				var id = li.firstElementChild.hash.split('/')[1];
				
				if (id === index){
					console.log(id);
					console.log(list[id]);
					return;
				}
			});			
		});*/

		/*/ why is this not working???
		this.property.addEventListener('click', function(e){
			this.EventHandler(e);
		});*/

		this.property.addEventListener('click', this.EventHandler);
	}

	getListItems(id = null){
		/* save reference to 'this' (i.e. this class) and used self where errors are thrown below.
		   arrow functions do not have issue of 'this' undefined*/
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
		/* save reference to 'this' (i.e. this class) and used self where errors are thrown below.
		   arrow functions do not have issue of 'this' undefined*/
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

	//EventHandler(link, listItem){
	EventHandler(event){
		event.preventDefault();
		event.stopPropagation();

		const self = this;
		var backBtn = document.querySelector('.back-btn');
		var backBtn2 = document.querySelector('.back-btn2');
		var frm = document.querySelector('form');
		var index;

		backBtn.addEventListener('click', self.pageBack);
		//backBtn2.addEventListener('click', self.pageBack2);

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
				console.log(id);
				console.log(self.list[id]);
				window.location.hash = '/' + id;

				/*var propertyDetailPage = new PropertyDetailPage('#property');
				propertyDetailPage.addListItem(self.list[id]);		// update model and re-render
				//var path = '#/' + self.list[id].id + '/detail';*/
				self.displayDetails(self.list[id]);

				//backBtn.classList.toggle('hide');
				backBtn.classList.remove('hide');
				backBtn2.classList.add('hide');
				
				//frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
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
		//var path = '#/' + self.list[id].id + '/detail';
	}

	pageBack(){
		const self = this;
		var backBtn = document.querySelector('.back-btn');
		var frm = document.querySelector('form');

		//console.log('one page back');
		window.history.back();			// this will trigger popstate hence no need for next line
		self.getListItems(null);

		//backBtn.classList.toggle('hide');

		if (!backBtn.classList.contains('hide')){
			backBtn.classList.add('hide');	
		}

		/*if (backBtn2.classList.contains('hide')){
			backBtn2.classList.remove('hide');
		}*/
		
		//frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
		if (frm.classList.contains('hide')){
			frm.classList.remove('hide');
		}
	}

	/*pageBack2(){
		const self = this;
		var backBtn2 = document.querySelector('.back-btn2');
		var frm = document.querySelector('form');
		
		console.log('one page back2');
		window.history.back();
		self.getListItems(null);

		//backBtn2.classList.add('hide');

		//frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
	}*/

}

export default PropertyListItem;