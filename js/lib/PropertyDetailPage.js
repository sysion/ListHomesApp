'use strict';


class PropertyDetailPage{
	constructor(property, getPropertyInfo){
		this.property = document.querySelector(property);
		this.currentProperty = '';		// object (local state available inside component's scope)
	}

	addListItem(listItem){
		this.currentProperty = listItem;
		this.renderListItem();
	}

	renderListItem(){
		this.property.innerHTML = this.ListItemTemplate(this.currentProperty);
	}

	ListItemTemplate(listItem){
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