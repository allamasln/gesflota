const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adsSchema = new mongoose.Schema({
  vehiculo: String,
  marca: String,
  modelo: String,
  combustible: String,
  tipo: String,
  cilindrada: String,
  potencia: String,
  matriculacion: String,
  kilometros: String,
  precioFinal: String,
  photo: String,
  address: String,
  creatorID: { type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });


const Ads = mongoose.model('Ads', adsSchema);
module.exports = Ads;
