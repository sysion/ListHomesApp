class GetPropertyInfo{
	constructor(id=''){
		if (Number(id) === id){
			this.id = id;
		}
	}

	async getAllProperties(){
		const response = await fetch('http://127.0.0.1:12345/api/houses/index.php');						// home laptop
		//const response = await fetch('http://127.0.0.1:12345/index.php');									// office laptop
		//const response = await fetch('https://houserestapi.herokuapp.com/index.php'); 					// remote
    	return response.json();
	}

	async getProperty(id){
		const response = await fetch(`http://127.0.0.1:12345/api/houses/index.php?id=${id}`);				// home laptop
		//const response = await fetch(`http://127.0.0.1:12345/index.php?house=${id}`);						// office laptop
		//const response = await fetch(`https://houserestapi.herokuapp.com/index.php?id=${id}`);			// remote - nok
		//const response = await fetch(`https://houserestapi.herokuapp.com/index.php?house=${id}`);			// remote
		return response.json();
	}
}

export default GetPropertyInfo;