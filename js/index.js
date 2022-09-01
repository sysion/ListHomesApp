import PropertyListItem from './lib/PropertyListItem.js';
import GetPropertyInfo from './lib/GetPropertyInfo.js';

;(()=>{
	const propertyListItem = new PropertyListItem('#property');

	/*let listItem = `<li> 
						<a href=''>
							<div>
						  		<h1>id:</h1>
						  		<h2>code:</h2>
						  		<h3>agent:</h3>
							</div>
						</a>
					</li>`;*/

	//let listItem = {id:16,code:"house-17",agent:"Danladi Zubair"};
	//let listItem = []; 

	const getPropertyInfo = new GetPropertyInfo();

	/*let propertiesInfo = getPropertyInfo.getAllProperties().then(function(result){
		return result;
	});*/

	getPropertyInfo.getAllProperties().then(result=>{
		let propertiesInfo = result;
		//console.log(propertiesInfo);

		propertiesInfo.forEach(item =>{
			var listItemSummary = {id:item.id, code:item.code, agent:item.agent};
			//listItem[item.id] = listItemSummary;
			propertyListItem.addListItems(listItemSummary);
		});

		//console.log(listItem);

		//propertyListItem.renderListItems(listItem);
		propertyListItem.renderListItems();
	});	

	let footer_p = document.querySelector('footer > p');
	footer_p.innerHTML = '&copy;' + new Date().getFullYear() + ' Sysion Nigeria Ltd';
})();