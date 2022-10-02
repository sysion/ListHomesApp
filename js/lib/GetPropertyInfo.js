class GetPropertyInfo{
	constructor(id=''){
		if (Number(id) === id){
			this.id = id;
		}
	}

	async getAllProperties(){
		const response = await fetch('https://houserestapi.herokuapp.com/index.php'); 					// remote
    	return response.json();
	}

	async getProperty(id){
		const response = await fetch(`https://houserestapi.herokuapp.com/index.php?house=${id}`);			// remote
		return response.json();
	}
}

export default GetPropertyInfo;