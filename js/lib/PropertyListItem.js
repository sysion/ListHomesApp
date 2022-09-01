class PropertyListItem{
	constructor(property){
		this.property = document.querySelector(property);

		//state i.e. data our app currently has access to; example data {id:16,code:"house-17",agent:"Danladi Zubair"}
		this.list = {};
	}

	addListItems = (listItemSummary)=>{
		this.list[listItemSummary['id']] = listItemSummary;
		//console.log(this.list);
	}

	renderListItems = ()=>{
		let listItems = [];
		
		/*/ this doesn't work for object of objects
		Array.from(this.list).forEach((item)=>{
			//listItems.push(ListItemTemplate(item));
			console.log(item);
		});*/

		let listItemSummary = Object.values(this.list);
		//console.log(listItemSummary);

		Array.from(listItemSummary).forEach((item)=>{
			//console.log(listItemSummary);
			listItems.push(this.ListItemTemplate(item));
		});

		//console.log(listItems);
		this.property.innerHTML = listItems.join('');
	}

	renderListItem = (listItem)=>{
		this.property.innerHTML = this.ListItemTemplate(listItem);
	}

	ListItemTemplate = (listItem)=>{
		return listItem = `<li> 
								<a href=''>
									<div>
								  		<h1>id: ${listItem.id}</h1>
								  		<h2>code: ${listItem.code}</h2>
								  		<h3>agent: ${listItem.agent}</h3>
									</div>
								</a>
							</li>`;
	}

}

export default PropertyListItem;