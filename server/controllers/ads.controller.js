const puppeteer = require('puppeteer');

const mongoose = require('mongoose');
const User = require('../models/user.model');
const Ads = require('../models/ads.model');

const uploadCloud = require('../configs/cloudinary.config');



const Tasa = {

  vehicle: {},

  
  get: async function(vehiculo, res) {
   
    this.browser = await puppeteer.launch()
    

    
    const page = await this.browser.newPage()

    let kmCol, lst, type;
    if(vehiculo.vehiculo == "coche") {

      await page.goto('https://www.autoscout24.es/busqueda-detallada?sort=standard&desc=0&ustate=N%2CU&cy=E&atype=C&ac=0').catch(e => void e)
      kmCol = [20000,30000,40000,50000,60000,70000,80000,90000,100000,125000,150000,175000,200000];
      lst = "lst";
      type = "C";
      
      
    }
   
   

    
    
    if(vehiculo.vehiculo == "moto") {
      await page.goto('https://www.autoscout24.es/busqueda-detallada?sort=standard&desc=0&offer=U%2CD%2CJ%2CO&ustate=N%2CU&cy=E&body=112&atype=B&ac=0').catch(e => void e)
      kmCol = [1000,2500,5000,7500,10000,15000,20000];
      lst = "lst-moto";
      type = "B";
    }

    // const buttonAvanzadas = await page.$('.cl-refine-search-link-container a')
    // await buttonAvanzadas.click()

      await page.waitFor('[data-test=make0] input');


      await page.type('[data-test=make0] input', vehiculo.marca);



    await page.waitFor('li.react-autocomplete__list-item--selected');
    let butt = await page.$('li.react-autocomplete__list-item--selected')

    let marca = await page.evaluate(el => el.innerHTML, await page.$('li.react-autocomplete__list-item--selected span'));
    
    
    marca = marca.replace("<strong>", "");
    marca = marca.replace("</strong>", "");
    marca = marca.toLowerCase();

    
 
    

    await butt.click()
    

    
    await page.waitFor(700);
    let modelEnd = vehiculo.modelo.split(" ")[0];
    
    
    await page.waitFor('[data-test=modelmodelline0] input:not([disabled])');
   await page.type('[data-test=modelmodelline0] input', modelEnd);
   await page.waitFor('li.react-autocomplete__list-item--selected');
   
    butt = await page.$('li.react-autocomplete__list-item--selected')

    let modelo = await page.evaluate(el => el.innerHTML, await page.$('li.react-autocomplete__list-item--selected span'));
    
    
    modelo = modelo.replace("<strong>", "");
    modelo = modelo.replace("</strong>", "").replace(" ", "-");
    modelo = modelo.toLowerCase();

    
    await butt.click()

    await page.waitFor(700);
    let yearStar = await vehiculo.matriculacion.split('/')[2];
    
    if(vehiculo.vehiculo == "moto") {
      yearStar = (+yearStar +1).toString();
    }

    
    

    
    
    
    let startKm, endKm;
    

    kmCol.forEach((val, idx)=> {
        
      if(val < vehiculo.km) {
        startKm = val;
        if(vehiculo.km <= [kmCol.length-1]) {
          endKm = kmCol[idx+1]
        }
      }

    });
    
    
    

  

  
      

      let kmTo, kmFrom;
    
      if(vehiculo.km <= kmCol[0]) {
        kmTo = kmCol[0];
        kmFrom = 0;
        // await page.select('[data-test=km-to]', '20000')
      } else {

        if(vehiculo.km >= kmCol[kmCol.length-1]) {
          kmFrom = kmCol[kmCol.length-1];
          kmTo = 0;
          // await page.select('[data-test=km-from]', '200000')
        } else {

          kmFrom = startKm.toString();
          kmTo = endKm.toString();
          // await page.select('[data-test=km-from]', startKm.toString())
          // await page.select('[data-test=km-to]', endKm.toString())
        }


        
      }
      

      if(kmFrom != 0) {
        kmFrom = `&kmfrom=${kmFrom}`
      } else {
        kmFrom = "";
      }

      if(kmTo != 0) {
        kmTo = `&kmto=${kmTo}`
      } else {
        kmTo = "";
      }

      
      let page2;
      if(vehiculo.vehiculo == "moto"){
        
        page2 = await this.browser.newPage()
        await page2.goto(`https://www.autoscout24.es/${lst}/${marca}/${modelo}?sort=standard&desc=0&offer=U%2CD%2CJ%2CO&ustate=N%2CU&cy=E${kmFrom}${kmTo}&fregto=${yearStar}&fregfrom=${yearStar}&body=112&atype=${type}&ac=0`).catch(e => void e)
        
      } 
      
      if(vehiculo.vehiculo == "coche") {
        console.log("a");
        page2 = await this.browser.newPage()
        console.log("b");
        await page2.goto(`https://www.autoscout24.es/${lst}/${marca}/${modelo}?sort=standard&desc=0&ustate=N%2CU&cy=E${kmFrom}${kmTo}&fregto=${yearStar}&fregfrom=${yearStar}&atype=${type}&ac=0`).catch(e => void e)
        console.log("c");
      }
      

      console.log("d");
      
      
      
      
      const items = await page2.$$('.cldt-price');
      console.log("hola3");
      let acc = 0;
      for (let i = 0; i < items.length; i++) {
        let item = await (await items[i].getProperty('innerText')).jsonValue();
        
        item = item.replace(".", "").split(" ")[1].split(",")[0]; 
        
        acc += +item;
        
      }

      
      let media = acc/items.length;
      console.log(media);
      if(vehiculo.vehiculo == "moto") {
        media -= 234;
      }

      
      
      if(media > 0) {
        await this.browser.close();

        res.status(200).json({precioEstimado: media});
        
        
      } else {
        await this.browser.close();
        res.status(200).json({error: 3});        
      }
      
      
  
    
    
    
    
   


    
    
    

  }
}


const FichaTecnica = {

  vehicle: {},
  error: false,

  errorCoche: false,
  errorMoto: false,

  _getValue: function(field) {
    return new Promise((resolve, reject) => {  

      
     
      let counter = 0
      let intervalId = setInterval(() => {

        if(this.vehicle.vehiculo) {

          clearInterval(intervalId);
          
        }
        
        field.getProperty('value').then(value=> 
          {
            if(value._remoteObject.value != "") {
              
              clearInterval(intervalId);

              resolve(value._remoteObject.value);
            } else {
              
              if(counter == 1000) {
                clearInterval(intervalId);
                resolve(0);
              }
              
            }
            
          }).catch(err => reject())
      }, 10);
    })
  },

  
  get: async function(cif, mat, res) {
    
    this.browser = await puppeteer.launch()
    
   


    

    
    const page = await this.browser.newPage()
    
    await page.goto('https://www.juntadeandalucia.es/economiayhacienda/apl/surweb/modelos/modelo621/621.jsp')

    await page.type('input#h1c019', cif)

    const checkbox = await page.$('input[value="motocicleta"]')
    await checkbox.click()
    await page.type('input#h1c067_2', mat)

    const button = await page.$('#enlace2Pulse')
      await button.click()
      

      
      const page2 = await this.browser.newPage()

      page2.waitFor(400);
      await page2.goto('https://www.juntadeandalucia.es/economiayhacienda/apl/surweb/modelos/modelo621/621.jsp')
      await page2.type('input#h1c019', cif)
      await page2.type('input#h1c067_1', mat)
      const button2 = await page2.$('#enlace1Pulse')
      await button2.click()

    
    
    let promises = [];
    
     promises.push(this._getValue(await page.$('#h1c046_2')));
     promises.push(this._getValue(await page.$('#h1c047_2')));
     promises.push(this._getValue(await page.$('#h1c066_2')));
     promises.push(this._getValue(await page.$('#h1c052_2')));
     promises.push(this._getValue(await page.$('#h1c048_2')));
     promises.push(this._getValue(await page.$('#h1c051_2')));


     let promises2 = [];
    
        promises2.push(this._getValue(await page2.$('#h1c045_1')));
        promises2.push(this._getValue(await page2.$('#h1c150')));
        promises2.push(this._getValue(await page2.$('#h1c046_1')));
        promises2.push(this._getValue(await page2.$('#h1c047_1')));
        promises2.push(this._getValue(await page2.$('#h1c052_1')));
        promises2.push(this._getValue(await page2.$('#h1c066_1')));
        promises2.push(this._getValue(await page2.$('#h1c048_1')));
        promises2.push(this._getValue(await page2.$('#h1c051_1')));

    

      
       Promise.all(promises).then( (values) => { 
         
          // if(this.vehicle) return;
          if(values[0] == 0) {
    
           
            this.errorMoto = true;
    
            if(this.errorCoche === true) {
              
              
              this.error = true;
              
            }

            
            // return;
          } else {
            this.vehicle = {
              vehiculo: "moto",
              marca: values[0],
              modelo: values[1],
              matriculacion: values[2],
              bastidor: values[3],
              potencia: values[4],
              cilindrada: values[5]
            }
            this.errorMoto = false;
            this.error = false;
            
            
        
              // this.browser.close();
       
              
       
          
            
            res.status(200).json(this.vehicle);
            return;
             
              
    
          }
          
             
         
          
        }, (reason) => {
          
          this.error = true;
          console.log(reason);
        
        });   
       
        
    Promise.all(promises2).then( (values) => { 
      
      // if(this.vehicle) return;
      
      if(values[0] == 0) {
      
        this.errorCoche = true;
        if(this.errorMoto === true) {
        
            this.error = true;
            
            
            
          }
          // return {error: true}


      } else {
        this.vehicle = {
          vehiculo: "coche",
          tipo: values[0],
          combustible: values[1],
          marca: values[2],
          modelo: values[3],
          matriculacion: values[5],
          bastidor: values[4],
          potencia: values[6],
          cilindrada: values[7]
        }
        this.errorCoche = false;
        this.error = false;
        

        
          // this.browser.close();
   
          
   
        
        
        res.status(200).json(this.vehicle);
        return;
        
      }
      
      
    }, (reason) => {
      
        
        this.error = true;
        
        console.log(reason);
       

      });

      
    
  }
}


module.exports.getInfo = (req, res, next) => {
  if(FichaTecnica.browser) {
    FichaTecnica.browser.close();
  }
  if(Tasa.browser) {
    Tasa.browser.close();
  }
  FichaTecnica.vehicle = {};
  FichaTecnica.error = false;
  FichaTecnica.errorCoche = false
  FichaTecnica.errorMoto = false
  FichaTecnica.get(req.body.nif, req.body.plate, res).catch(err => {
    // res.status(200).json({error: 1});
  });

}

module.exports.getTasa = (req, res, next) => {
  if(Tasa.browser) {
    Tasa.browser.close();
  }
  if(FichaTecnica.browser) {
    FichaTecnica.browser.close();
  }
  Tasa.get(req.body, res).catch(err => {
    // res.status(200).json({error: 1});
    console.log(err);
  });

}

module.exports.create = (req, res, next) => {
  
  const newPhoto = req.file.url;
  const {vehiculo, marca, modelo, combustible, tipo, cilindrada, potencia, matriculacion, kilometros, precioFinal, address } = JSON.parse(req.body.vehicle)
  
  Ads.create({
     vehiculo,
     marca,
     modelo,
     combustible,
     tipo,
     cilindrada,
     potencia,
     matriculacion,
     kilometros,
     precioFinal,
     address,
     photo: newPhoto,
     creatorID: req.user.id
  })
  .then(adsCreated => console.log(adsCreated))
  .catch(err => console.log(err))

  

}

module.exports.list = (req, res, next) => {

  Ads.find().populate("creatorID")
  .then(AllAds => res.json(AllAds))
  .catch(err => console.log(err))
}
