'use strict';

class PropertyDetailPage{
	constructor(property){
		this.property = document.querySelector(property);

		//state i.e. data our app currently has access to; example data 
		/*{
			id:16,
			code:"house-17",
			address:"219, Ajaokuta road, Idanle, Kogi State",
			agent:"Danladi Zubair",
			url:"http://127.0.0.1:12345/api/houses/images/house-17.jpg"
		}*/
		this.currentProperty = '';
	}

	addListItem = (listItem)=>{
		this.currentProperty = listItem;
	}

	renderListItem = ()=>{
		this.property.innerHTML = this.ListItemTemplate(this.currentProperty);
	}

	ListItemTemplate = (listItem)=>{
		return listItem = `<li class='detail'> 
								<div>
							  		<h2>ID: ${listItem.id}</h2>
							  		<h2>Code: ${listItem.code}</h2>
							  		<h2>Agent: ${listItem.agent}</h2>
							  		<h3>Address: ${listItem.address}</h3>
							  		<div><img src=${listItem.url} alt='house image for ${listItem.code}' /></div>
								</div>
							</li>`;
	}

}

export default PropertyDetailPage;