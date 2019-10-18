import React, { Component, Fragment } from 'react';
import AuthService from './../services/AdsService'
import PlacesAutocomplete from './placeAutocomplete'

import './style.css'
import AdsService from './../services/AdsService';
import Spinner from './spinner';
import { SlowBuffer } from 'buffer';
import {withRouter} from 'react-router-dom';

class ToPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: '',
      file: null,
      plate: '',
      km: '',
      address: '',
      location: '',
      loadFicha: false,
      loadTasa: false,
      finalPrice: null,
      anadido: false
    }

    this.service = new AdsService();
  }
  
  handleChange(e) {

    const {name, value} = e.target;
        
    this.setState({[name]: value});

    if(e.target.files) {

    this.setState({
      ...this.state,
      file: e.target.files[0]
    })

    }
    
  }

  getAddress(adr) {

    this.setState({
      ...this.state,
      address: adr
    })

  }

  getLocation(loc) {

    this.setState({
      ...this.state,
      location: loc
    })

  }

  getTasa(e) {

    
    this.setState({
      ...this.state,
      loadTasa: true
    })

    if(this.state.vehiculo) {
      this.service.getTasa(this.state.vehiculo, this.state.marca, this.state.modelo, this.state.matriculacion, e.target.value).then(response => {

        this.setState({
          ...this.state,
          loadTasa: false,
          precioEstimado: response.precioEstimado
        })
  
      }).catch(err => {
        this.setState({
          ...this.state,
          loadTasa: false
        })
      })
    }


  }
  getInfoByPlate(e) {

    if(e.target.value == "" || (e.target.value).length < 7 || (e.target.value).length > 7) return;
    this.setState({
      ...this.state,
      loadFicha: true
    })
    
     

    this.service.getInfo(this.props.loggedInUser.nif, e.target.value)
    .then(response => {

      if(response && response.error && response.error == 0) {

        this.setState({
          ...this.state,
          loadFicha: false
        })
      }

      if(response && response.marca) {
        console.log(JSON.stringify(response));
        this.setState({
          ...this.state,
          ...response,
          loadFicha: false
        })

      }

    })
    .catch(err => {
      this.setState({
        ...this.state,
        loadFicha: false
      })
    })
  }

  //esta función maneja qué pasa cuando hago submit en el formulario de subida de imágenes
  handleSubmit(e) {
    e.preventDefault()
    // Reuse of the method "addPicture" from the file '../api'

    this.service.addAds({...this.state}).then(adsAdded => {

      console.log("AÑADIDO CAMPEOIN");
      console.log(adsAdded);

    })



    // AuthService.addPicture(this.state.file).then(photoData => {
    //   let newPhoto = this.state.photo
    //   newPhoto = photoData.url

    //   this.setState({
    //     ...this.state,
    //     photo: newPhoto
    //   })
    // })
  }
  render() {      
    
    
    return (
      <center>

          <form onSubmit={(e)=>this.handleSubmit(e)}>
      <div className="row">
      <div className="col s12 m4 l3"> 
        <div className="ToPost">
        <h5 className="indigo-text">Publica tu vehículo</h5>



              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='text' name='plate' id='plate' value={this.state.plate} onBlur={e => this.getInfoByPlate(e)} onChange={e => this.handleChange(e)}  />
                  <label for='plate'>Introduce matrícula</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='number' name='km' id='km' onBlur={e => this.getTasa(e)} value={this.state.km} onChange={e => this.handleChange(e)}  />
                  <label for='km'>Introduce kilómetricos</label>
                </div>
              </div>


              <PlacesAutocomplete
              value={this.state.value}
              onChange={value => this.setState({ value })}
              getAddress={(adr) => this.getAddress(adr)}
              getLocation={(loc) => this.getLocation(loc)}
              
            />

            <div className='row'>
            <div className="file-field col s12 input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={(e)=>this.handleChange(e)} />
                </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" name="filePath" id="filePath"/>
              </div>
            </div>
            </div>

            

            
            
          

          {this.state.photo && <img src={this.state.photo} alt="Foto" />}
    </div>
    </div>

    <div className="col s12 m8 l9"> 

    {this.state.loadFicha && <Fragment><Spinner text="obteniendo datos del vehículo"/></Fragment>}


    {this.state.loadTasa && <Fragment><Spinner text="Calculando tasación estimada"/></Fragment>}
    
    {(this.state.vehiculo && this.state.marca && this.state.modelo && this.state.matriculacion && this.state.potencia && 
    this.state.cilindrada)  &&
    
    
    <ul className="adsCard">
    {(this.state.vehiculo) && <li className="vehiculo"><span>Tipo vehículo:</span> {this.state.vehiculo}</li>}
    {(this.state.marca) && <li className="marca"><span>Marca: </span>{this.state.marca}</li>}
    {(this.state.modelo) && <li className="modelo"><span>Modelo: </span>{this.state.modelo}</li>}
    {(this.state.combustible) && <li className="combustible"><span>Combustible: </span>{(this.state.combustible) == "D" && "Diesel"}</li>}
    {(this.state.tipo) && <li className="tipo"><span>Tipo: </span>{this.state.tipo}</li>}
    {(this.state.matriculacion) && <li className="matriculacion"><span>Matriculación: </span>{this.state.matriculacion.split('/')[2]}</li>}
    {(this.state.potencia) && <li className="potencia"><span>Potencia: </span> {this.state.potencia}</li>}
    {(this.state.cilindrada) && <li className="cilindrada"><span>Cilindrada: </span> {this.state.cilindrada}</li>}
    {(this.state.km) && <li className="km"><span>Kilometros: </span> {this.state.km}</li>}
    {(this.state.address) && <li className="ubicacion"><span>Ubicación: </span> {this.state.address}</li>}

    {(this.state.precioEstimado) && 
    <Fragment>
      <li className="precio-estimado"><strong>Tasación estimada: </strong> {this.state.precioEstimado} €</li>

      <ul>
        <li>
        
        <div className='row'>
                <div className='input-field col s6'>
                  <input placeholder="Introduce precio final" className='validate' name="finalPrice" id="finalPrice" value={this.state.finalPrice} onChange={(e) => this.handleChange(e)}  />
                  
                </div>
              </div>
        </li>
        {(this.state.finalPrice  && this.state.address && this.state.file) && <li><button style={{float: 'right'}} type="submit">Publicar</button></li>}
       
      </ul>


    </Fragment>}
    </ul>
    
  }
     
    </div>

    </div>
     </form>
          
     
      </center>
    );
  }
}

export default withRouter(ToPost);