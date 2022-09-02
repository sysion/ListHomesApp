import PropertyDetailPage from './PropertyDetailPage.js';
import GetPropertyInfo from './GetPropertyInfo.js';

class PropertyListItem{
	constructor(property){
		this.property = document.querySelector(property);

		//state i.e. data our app currently has access to; example data {id:16,code:"house-17",agent:"Danladi Zubair"}
		this.list = {};		//object of objects
	}

	addListItems = (listItemSummary)=>{
		this.list[listItemSummary['id']] = listItemSummary;
		//console.log(this.list);
	};

	renderListItems = ()=>{
		let listItems = [];
		let idLinks = [];
		
		/*/ this doesn't work for object of objects
		Array.from(this.list).forEach((item)=>{
			//listItems.push(ListItemTemplate(item));
			console.log(item);
		});*/

		let listItemSummary = Object.values(this.list); // get only the values from the object
		//console.log(listItemSummary);

		Array.from(listItemSummary).forEach((item)=>{
			//console.log(listItemSummary);
			listItems.push(this.ListItemTemplate(item));
			idLinks.push(item.id);
		});

		//console.log(listItems);
		this.property.innerHTML = listItems.join('');

		//add EventListeners
		idLinks.forEach(item =>{
			var link = document.querySelector('a[href*="'+item+'"]');
			//var itemSummary = listItemSummary[item];
			//this.EventHandler(link, itemSummary);
			var itemSummary;

			const getPropertyInfo = new GetPropertyInfo(item);

			//Because getAllPropertys() is async, all action on the returned value MUST be done inside the THEN callback
			getPropertyInfo.getProperty().then(result=>{
				//console.log(result.id);
				if (item == result.id){
					itemSummary = result;
					this.EventHandler(link, itemSummary);
				}
			});	











		});
	};

	renderListItem = (listItem)=>{
		this.property.innerHTML = this.ListItemTemplate(listItem);
	};

	ListItemTemplate = (listItem)=>{
		return listItem = `<li> 
								<a href='#/${listItem.id}'>
									<div>
								  		<h1>id: ${listItem.id}</h1>
								  		<h2>code: ${listItem.code}</h2>
								  		<h3>agent: ${listItem.agent}</h3>
									</div>
								</a>
							</li>`;
	};

	EventHandler = (link, listItem)=>{
		//console.log(link);
	
		link.addEventListener('click', (e)=>{
			e.preventDefault();
			e.stopPropagation();
			//console.log('hello');
			let propertyDetailPage = new PropertyDetailPage('#property');
			propertyDetailPage.addListItem(listItem);
			propertyDetailPage.renderListItem();
		});
	};

}

export default PropertyListItem;