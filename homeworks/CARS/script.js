
const cars = [
    {id:'1',
    brandTitle: 'BMW',
    modelTitle: 'M5',
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJNlJZqJHrakxLlATPfxY2j1JsXDg6T9TaA&usqp=CAU",
    discrip: 'the best car',
    price: '195000'
},
{   id:'2',
    brandTitle: 'Audi',
    modelTitle: 'Q5',
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GetuFWE8pbI5oxX25Y-getRULbnT9Kh4uQ&usqp=CAU",
    discrip: 'the best car',
    price: '66000'
},
{   id:'3',
    brandTitle: 'Mazda',
    modelTitle: 'CX5',
    imgURL: "https://editorials.autotrader.ca/media/193626/2021-mazda-cx-5-100th-anniversary-edition-02-di.jpg?anchor=center&mode=crop&width=1920&height=1080&rnd=132600028584630000",
    discrip: 'the best car',
    price: '48500'
}]
// const cars = [];
let id = 0;
const addAuto = () => {
  if (checkForm(form)) {
    id+=1;
  let brandTitle = document.form.brandTitle.value;
  document.form.brandTitle.required;
  let price = document.form.price.value;
  let modelTitle = document.form.modelTitle.value;
  let imgURL = document.form.imgURL.value;
  let discrip = document.form.discrip.value;
  cars.push({id,brandTitle, modelTitle, price, imgURL, discrip })
  console.log(cars)
  }
}
let checkForm = (form) =>{
  for (var i = 0; i < form.elements.length-2; i++)
  if (form.elements[i].value == ''){
    alert ('Все поля должны быть заполнены!');
    return false;
}
else {return true;}}    
let collectionID = new Array;
// const elem = document.getElementById('app');
let getDiv = () => {
  let str = '';
  for (let car of cars) {
    let count =1;
    car.total = count;
    if (!collectionID.includes(car.id)) {
      str = `<div class="card" style="width: 18rem;">
            <img src="${car.imgURL}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${car.brandTitle} ${car.modelTitle}</h5>
            <h6 class="card-price"> ≈ ${car.price} $</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>`
        collectionID.push(car.id);
      if (car) {
        let main = document.getElementById('main');
        let divMain = document.createElement('div');
        divMain.setAttribute('id', 'app');
        divMain.innerHTML = str;
        main.appendChild(divMain);
      }
    }
  }
  
    
      function createEl(data){
          const p = document.getElementsByClassName('card-text')[data.id-1];
          const btn = document.createElement('button');
          const basket = document.createElement('i');
          basket.setAttribute('class', "fa-solid fa-cart-shopping");
          basket.style.color = "#0d6efd";
          btn.setAttribute('data-id', data.id);
          btn.setAttribute('class', 'btn_basket');
          btn.onclick = addBasket;
          btn.appendChild(basket);
          // if(!p.includes(btn)){
            
          // }
          if (p.querySelectorAll('button').length == 0) {
            p.appendChild(btn);
          }
    }
    for(let i = 0; i<cars.length; i++){
        createEl(cars[i]);
    }
  
  // elem.innerHTML = str;
}
// let hr = document.createElement('hr');
//     document.body.appendChild(hr);
let mainBlock = document.getElementById("main");

let sortIncrease = () => {
  while(mainBlock.firstChild) mainBlock.removeChild(mainBlock.firstChild);
  collectionID.length = 0;
  cars.sort((a, b) => { return parseInt(a.price) - parseInt(b.price); })
  getDiv(cars);
}
let sortDecrease = () => {
  while(mainBlock.firstChild) mainBlock.removeChild(mainBlock.firstChild);
  collectionID.length = 0;
  cars.sort((a, b) => { return parseInt(b.price) - parseInt(a.price); })
  getDiv(cars);

}

let hideForm = () => {
  form.classList.add('hidden');
  document.querySelector('#getForm').className = 'active';
  }
let activeForm = () => {
  form.classList.remove('hidden');
  document.querySelector('#getForm').classList.remove('active');
}
document.getElementById('render').addEventListener("click", getDiv);
document.getElementById('getForm').addEventListener("click", hideForm);
document.getElementById('getForm').addEventListener("click", activeForm);
document.getElementById('increase').addEventListener("click", sortIncrease);
document.getElementById('decrease').addEventListener("click", sortDecrease);
// корзина
let collectionBasket=[];
let basketArr = [];
let total=1;
const createElBask = (basketArr) => {
  let str = '';
  
  for (let car of basketArr) {
    if (!collectionBasket.includes(car.id)) {
      str = `<div class="card" style="width: 18rem;">
            <div class="allSelected">Выбрано: <span data-id=${car.id}>1</span> авто <button class="plus_btn" data-id=${car.id}><i class="fa-solid fa-cart-plus"></i></button></div>
            <img src="${car.imgURL}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${car.brandTitle} ${car.modelTitle}</h5>
            <h6 class="card-price"> ≈ ${car.price} $</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`
        collectionBasket.push(car.id);
       
        localStorage.setItem('cars', JSON.stringify(basketArr));
      
} 
// Если прописать добавление в корзину в else сработают кнопки только при добоавлении всех товаров
}}

let addBasket = (e) => {
    basketArr.push(cars.slice(e.target.parentNode.dataset.id-1)[0]);
        createElBask(basketArr);
}
