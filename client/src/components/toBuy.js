import React, { Component, Fragment } from "react";

import { Switch, Route, Redirect, Link } from "react-router-dom";
import AdsService from "../services/AdsService";

export default class ToBuy extends Component {

  constructor(props) {
    
    super();
    this.state = {
      AllAds: []

    }

    this.service = new AdsService();

  } 
  componentDidMount() {
    this.service.allAds()
    .then(response => {

      this.setState({
        ...this.state,
        AllAds: response
      })
     

    })
    .catch(err => console.log(err))
  }
  render() {
    return (

      <Fragment>
      {this.state.AllAds.map(ad =>{
        
        return <ul>
        {(ad.photo) && <li><img  src={ad.photo} /></li>} 
        {(ad.vehiculo) && <li className="vehiculo"><span>Tipo vehículo:</span> {ad.vehiculo}</li>}
        {(ad.marca) && <li className="marca"><span>Marca: </span>{ad.marca}</li>}
        {(ad.modelo) && <li className="modelo"><span>Modelo: </span>{ad.modelo}</li>}
        {(ad.combustible) && <li className="combustible"><span>Combustible: </span>{(ad.combustible) == "D" && "Diesel"}</li>}
        {(ad.tipo) && <li className="tipo"><span>Tipo: </span>{ad.tipo}</li>}
        {(ad.matriculacion) && <li className="matriculacion"><span>Matriculación: </span>{ad.matriculacion.split('/')[2]}</li>}
        {(ad.potencia) && <li className="potencia"><span>Potencia: </span> {ad.potencia}</li>}
        {(ad.cilindrada) && <li className="cilindrada"><span>Cilindrada: </span> {ad.cilindrada}</li>}
        {(ad.km) && <li className="km"><span>Kilometros: </span> {ad.km}</li>}
        {(ad.address) && <li className="ubicacion"><span>Ubicación: </span> {ad.address}</li>}
        {(ad.precioFinal) && <li className="ubicacion"><span>Precio Final: </span> {ad.precioFinal}</li>}
        {(ad.creatorID.username) && <li className="ubicacion"><span>Vendedor: </span> {ad.creatorID.username}</li>}
        {(ad.creatorID.phone) && <li className="ubicacion"><span>Telefono contacto: </span> {ad.creatorID.phone}</li>}
        </ul>
      })}
      </Fragment>
    )
  }
}
