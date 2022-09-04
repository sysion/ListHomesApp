'use strict';

import PropertyListItem from './lib/PropertyListItem.js';
import GetPropertyInfo from './lib/GetPropertyInfo.js';
import RouteProperty from './lib/RouteProperty.js';

;(()=>{
	let btn = document.querySelector('.back-btn');
	let frm = document.querySelector('form');
	let id = document.querySelector('input[name="id"]');
	let search = document.querySelector('button[name="search"]');
	let footer_p = document.querySelector('footer > p');
	let propertyListItem = new PropertyListItem('#property');

	/*let listItem = `<li> 
						<a href=''>
							<div>
						  		<h1>id:</h1>
						  		<h2>code:</h2>
						  		<h3>agent:</h3>
							</div>
						</a>
					</li>`;*/

	//let listItem = {id:16,code:"house-17",agent:"Danladi Zubair"};  // debugging
	//let listItem = []; 

	let getPropertyInfo = new GetPropertyInfo();
	let routeProperty = new RouteProperty(propertyListItem);

	/*/ Because getAllProperties() is async, it can not be assigned to a variable
	let propertiesInfo = getPropertyInfo.getAllProperties().then(function(result){
		return result;
	});*/

	//Because getAllProperties() is async, all action on the returned value MUST be done inside the THEN callback
	getPropertyInfo.getAllProperties().then(result=>{
		let propertiesInfo = result;
		//console.log(propertiesInfo);

		propertiesInfo.forEach(item =>{
			var listItemSummary = {id:item.id, code:item.code, agent:item.agent};
			//listItem[item.id] = listItemSummary;
			propertyListItem.addListItems(listItemSummary);		// update model
		});

		//console.log(listItem);

		propertyListItem.renderListItems();		// render view
		routeProperty.routeAddPath('home', '/');
	});	

	btn.addEventListener('click', function(){
		propertyListItem.renderListItems();		// render view
		routeProperty.routeAddPath('home', '/');

		if (window.location.hash){
			var hash = window.location.hash;
			//console.log('hash => '+hash);
			window.location.hash = '';
		}

		btn.classList.toggle('hide');
		frm.className === 'show' ? frm.className = 'hide' : frm.className = 'show';
	});

	search.addEventListener('click', function(e){
		e.preventDefault();		// needed because button(type submit) is trying to submit the form
		e.stopPropagation();	// needed because button(type submit) is trying to submit the form
		//console.log('searching');

		var idVal = Number(id.value.trim());
		//console.log('id => '+idVal);

		if (Number(idVal) === idVal && Number.isInteger(idVal)){
			/*let items = Object.values(propertyListItem.list);
	
			let item = Array.from(items).filter(function(item){
				//console.log('item => %s, idVal => %s', item.id, idVal);
				return item.id == idVal;	// returns an array
			});*/

			//console.log(item);
			//propertyListItem.renderListItem(item[0]);
			//routeProperty.routeAddPath('home', '/');



			//Because getProperty() is async, all action on the returned value MUST be done inside the THEN callback
			getPropertyInfo.getProperty(idVal).then(result=>{
				//console.log(result);
				propertyListItem.renderListItem(result);
				routeProperty.routeAddPath('home', '/');
			});	

		}
		id.value = '';
	});

	footer_p.innerHTML = '&copy;' + new Date().getFullYear() + ' Sysion Nigeria Ltd';

	// serviceWorker code
	if (! navigator.serviceWorker.controller) {//https or localhost required for serviceWorker
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