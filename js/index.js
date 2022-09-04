'use strict';

import PropertyListItem from './lib/PropertyListItem.js';
import GetPropertyInfo from './lib/GetPropertyInfo.js';
import RouteProperty from './lib/RouteProperty.js';

;(()=>{
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
	//routeProperty.routeAddPath('home', '/');
	//routeProperty.routeAddPath('page', '^#/([0-9]+)$');

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

		//propertyListItem.renderListItems(listItem);
		//propertyListItem.renderListItems();		// render view

		//routeProperty.routeAddPath('home', '/');
		routeProperty.routeInit();					// render view
	});	

	let footer_p = document.querySelector('footer > p');
	footer_p.innerHTML = '&copy;' + new Date().getFullYear() + ' Sysion Nigeria Ltd';
})();