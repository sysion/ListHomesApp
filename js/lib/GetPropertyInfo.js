class GetPropertyInfo{
	constructor(id=''){
		if (Number(id) === id){
			this.id = id;
		}
	}

	async getAllProperties(){
		const response = await fetch('http://127.0.0.1:12345/api/houses/index.php');
    	return response.json();
	}

	async getProperty(){
		const response = await fetch(`http://127.0.0.1:12345/api/houses/index.php?id=${this.id}`);
		return response.json();
	}
}

export default GetPropertyInfo;