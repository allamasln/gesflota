// auth/auth-service.js
import axios from 'axios';

class AdsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_HOST}`,
      withCredentials: true
    });
  }

  allAds = () => {
    return this.service.get('/ads/list')
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  addAds = (data) => {

    

    const formData = new FormData();
    

    formData.append("photo", data.file);
    delete data.file;
    formData.append("vehicle", JSON.stringify(data));
    
    


    return this.service.post('/ads/create',formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data)
    .catch(err => console.log(err));
  };

  getInfo = (nif, plate) => {

    return this.service.post('ads/getInfo', {nif, plate})
    .then(response => response.data).catch(error => {
      console.log(error);
      
  });
    
  }

  getTasa = (vehiculo, marca, modelo, matriculacion, km) => {

    return this.service.post('ads/getTasa', {vehiculo, marca, modelo, matriculacion, km})
    .then(response => response.data).catch(error => {
      
      console.log(error);
      
  });
    
  }

}

export default AdsService;