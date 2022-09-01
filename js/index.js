import PropertyListItem from './lib/PropertyListItem.js';

;(()=>{
	const propertyListItem = new PropertyListItem('#property');

	let listItem = `<li> 
						<a href=''>
							<div>
						  		<h1>id:</h1>
						  		<h2>code:</h2>
						  		<h3>agent:</h3>
							</div>
						</a>
					</li>`;

	propertyListItem.displayListItem(listItem);


	let footer_p = document.querySelector('footer > p');
	footer_p.innerHTML = '&copy;' + new Date().getFullYear() + ' Sysion Nigeria Ltd';
})();