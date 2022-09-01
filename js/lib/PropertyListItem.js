class PropertyListItem{
	constructor(property){
		this.property = document.querySelector(property);
	}

	addListItems = ()=>{

	}

	deleteListItem = ()=>{

	}

	displayListItem = (listItem)=>{
		this.property.innerHTML = listItem;
	}

}

export default PropertyListItem;