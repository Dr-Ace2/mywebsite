let cartButton = document.getElementById("cart-btn");
let modal = document.getElementById("cart-modal");
let productModal = document.getElementById('modal');
let body = document.getElementsByTagName("body");
let continueShoppingBtn = document.getElementsByClassName("ctn")[0];
let cartText = document.getElementById("cart-val");
let priceText = document.getElementsByClassName("price");
let productName = document.getElementsByClassName("product-name");
let productsContainer = document.getElementById("products-container");
let cartTab = document.getElementById('cart-tab');
let table = document.getElementById("table");
let totalAmount = document.getElementById("total");
let userName = document.getElementById('name');
let email = document.getElementById('email');
let number = document.getElementById('number');
let nameError = document.getElementById('name-error');
let emailError = document.getElementById('email-error');
let numberError = document.getElementById('number-error');
let checkoutBtn = document.querySelector('.checkout');
let summary = document.getElementById('summary');
let summaryTable = document.getElementById('table-body');
let buyerName = document.getElementById('b-name');

let buttons;
let subtractBtn;
let addBtn;
let removeBtn;




// let count = document.getElementById('count');
// let productsContainer = document.getElementById('third');
// let formModal = document.getElementById("formpop");
// let counterCart = document.getElementById('countkart');
// let contshop =document.getElementById("cont");
// let table = document.getElementById('tab');
// let totalAmount = document.getElementById('amountTotal');
// let userName = document.getElementById("name")
// let email = document.getElementById("email")
// let number= document.getElementById("number")
// let nameError = document.getElementById('para1');
// let emailError = document.getElementById('para2');
// let numberError = document.getElementById('para3');
// let checkOut =document.getElementById('check');
// let modal=document.getElementById('formpop');
// let summary = document.getElementById('summary');
// let summaryTable = document.getElementById('table-body');
// let buyerName = document.getElementById('b-name');

// let buttons;


let products = [
{
    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000,
    src: 'assets/images/product1.png',
    quantity: 1

},

{
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000,
    src: 'assets/images/product2.png',
    quantity:1

},
{
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000,
    src: 'assets/images/product3.png',
    quantity: 1
},
{
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 800000,
    src: 'assets/images/product4.png',
    quantity:1
},
{
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000,
    src: 'assets/images/product5.png',
    quantity:1
},
{
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 75000,
    src: 'assets/images/product6.png',
    quantity:1
},
]



let cart = [];
let totalPrice;

function setCart(){
    cartText.innerHTML = cart.length;
}

setCart()

function loadData(){
    let data = '';
    let text;
    products.forEach(product => {
        cart.includes(product)? text = 'REMOVE FROM CART' : text = 'ADD TO CART';
        data += 
        `<div class="items">
            <div class="item_overlay">
                <img class="product-img" src=${product.src} alt="products">
                <div class="img__overlay">
                    <h2>PRICE</h2>
                    <h1 class="price">&#8358;${product.price}</h1>
                </div>  
            </div>
            <h3 class="product-name">${product.name}</h3>
            <button class="add-btn" item-id=${product.id}>${text}</button>
       </div>`     
    });

    productsContainer.innerHTML = data;

    // the ... Spread Operator turns the nodelist returned from querySelectorAll into an array
    buttons = [...document.querySelectorAll(".add-btn")];
}

function add(){
    let id = this.parentNode.getAttribute('row-id');
    let prod = cart.find(item => item.id == id)
    prod.quantity += 1;
    this.parentNode.children[1].innerHTML = prod.quantity;
    setTotal();
}

function minus(){
    let id = this.parentNode.getAttribute('row-id');
    let prod = cart.find(item => item.id == id)
    if(prod.quantity === 1){
        alert("Quantity cannot be less than 1")
    }else{
        prod.quantity -= 1;        
        this.parentNode.children[1].innerHTML = prod.quantity;
        setTotal();
    }
}

//This Function Shows the transaction Summary after payment is made.
function showSummary(){
    summary.style.display = 'block';
    productModal.style.display = 'none';
}

function setAmount(){
    
    totalAmount.innerHTML = '&#8358;' + "0" ;
}

//This Function closes the transaction summar when invoked.
function closeSummary(){
    summary.style.display = 'none';
    setAmount();
     clearCart();
     setCartValue();
     closeModal();
     loadData();
     addItemToCart();
     
     
}

//This function clears all input value after payment is made...
function clearInputs(){
    userName.value = '';
    email.value = '';
    number.value = '';
    userName.style.border = 'none';
    email.style.border = 'none';
    number.style.border = 'none';
}

// This Function clears the cart after payment is made...
function clearCart(){
    cart = [];
    let header = table.children[0];
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
    table.appendChild(header);
    clearInputs();
    setCart()
}

//This Function creates the actual summary table
function createSummary(){
    let row = '';
     cart.forEach(item => {
         row += `<tr>
                 <td>${cart.indexOf(item) + 1}</td>
                 <td>${item.name}</td>
                 <td>${item.quantity}</td>
                 </tr>
         ` 
     })
      buyerName.innerHTML = userName.value;
      buyerName.style.color = '#FF7A00';
      summaryTable.innerHTML = row;
      showSummary();
      clearCart();
 }

function setTotal(){
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        totalPrice = cart[i].price * cart[i].quantity;
        total += totalPrice;
    }
    totalAmount.innerHTML = '&#8358;' + total;
    return total;
}
// remove what?/where is data-id declared ?

function removeProduct(){
    let id = this.getAttribute('data-id');
    let item = cart.find(prod => prod.id === id);
    item.quantity = 1;
    let index = cart.indexOf(item)
    cart = [...cart.slice(0, index), ...cart.slice(index + 1, cart.length)];
    let parent = this.parentNode
    parent.parentNode.remove();
    setCart();
    setTotal();
}

function createRow(x){
    table.appendChild(x);
        subtractBtn = document.querySelectorAll('.minus');
        addBtn = document.querySelectorAll('.add');
        removeBtn = document.querySelectorAll('.remove');
        subtractBtn.forEach(btn =>{
            btn.addEventListener('click', minus)
        })
        addBtn.forEach(btn =>{
            btn.addEventListener('click', add)
        })
        removeBtn.forEach(btn =>{
            btn.addEventListener('click', removeProduct)
        })
}

//Add and Remove Function Used in the Add to cart buttons EventListener;
function addAndRemove(){
    let id = this.getAttribute('item-id');
    let product = products.find(item => item.id == id);
    if(cart.includes(product)){
        let child = document.querySelector(`[data-id=${id}]`);
        child.parentNode.removeChild(child);
        product.quantity = 1;
        let index = cart.indexOf(product);
        cart = [...cart.slice(0, index), ...cart.slice(index + 1, cart.length)];
         this.innerHTML = 'ADD TO CART';
         this.style.backgroundColor = '#FF7A00';
         this.style.color = '#000';
        setCart();
        setTotal();
    }else{
        cart = [...cart, product];
         this.innerHTML = "REMOVE FROM CART";
         this.style.backgroundColor = 'red';
         this.style.color = '#fff'
        setCart();

        // This Logic Creates a Table row for each Product inside the modal
        let tr = document.createElement('tr');
        tr.setAttribute('data-id', id)
        tr.innerHTML = `
        <td>${cart.indexOf(product) + 1}</td>
        <td>${product.name}</td>
        <td>&#8358;${product.price}</td>
        <td row-id=${product.id}><span class="inc minus">-</span> <span class="val">${product.quantity}</span><span class="inc add">+</span></td>
        <td><button class="remove" data-id=${product.id}>Remove</button></td>
        ` 
        createRow(tr);
        setTotal();
    }        
}

// This function Set up the event listeners for all the Add to Cart buttons.
function addItemToCart(){
    buttons.forEach(btn => {
        if(btn.textContent === 'REMOVE FROM CART'){
         btn.style.backgroundColor = 'red';
         btn.style.color = '#fff';
        }else{
         btn.style.backgroundColor = '#FF7A00';
         btn.style.color = '#000'; 
        }
        btn.addEventListener('click', addAndRemove);
    
    });
 }

 
 function openModal(){
     modal.style.display = "block";
     setTotal();
 }

 cartButton.addEventListener("click", openModal);

 function closeModal(){
     modal.style.display ="none";
     loadData();
     addItemToCart();
 }
 continueShoppingBtn.addEventListener("click", closeModal);



function validateName(){
    if(userName.value.length < 3){
        nameError.innerHTML = 'Name too short'
        userName.style.border = '2px solid red';
        return false;
    }else{
         nameError.innerHTML = ''
         userName.style.border = '2px solid green';
         return true;
    }     
 }

function validateEmail(){
    if(email.value == ""){
        email.style.border = 'red';
        emailError.innerHTML = "email must not be empty";
    }else if(!email.value.includes('@')){
        email.style.border = 'red';
        emailError.innerHTML = "invalid email address";
        return false;
    }else{
        email.style.border = '2px solid green';
        emailError.innerHTML = "";
        return true;
    }
}

function validateNumber(){
    let length = number.value.length
   if(length < 11 || length > 13){
       number.style.border = '2px solid red'
       numberError.innerHTML = 'number should not be less than 11 or 13';
       return false;
   }else{
        number.style.border = '2px solid green'
        numberError.innerHTML = '';
        return true;
   }
}

function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_a0b39e5fc3ab5a4089b60064acb6843f6661d182', // Replace with your public key
      email: email.value,
      amount: setTotal() * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        createSummary()
      }
    });
    handler.openIframe();
}

function pay(){
    if(cart.length < 1){
        alert("Kindly add an item to the Cart");  
    }else if(!validateName() || !validateEmail() || !validateNumber()){
        alert("Invalid Credentials");
    }else{
        payWithPaystack();
    }
}

checkoutBtn.addEventListener('click', pay)
loadData()
addItemToCart()

userName.addEventListener( 'blur', validateName)
email.addEventListener( 'blur', validateEmail)
number.addEventListener( 'blur', validateNumber )

// This function closes the modal anytime a user clicked outside of the modal.
window.onclick = function(event){
    if(event.target == modal){
        closeModal();
    }
  }

//   window.onclick= function(event){
//       if(event.target==modal){
//           closeModal();
//       }
//   }


// let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// number = [...number.slice(0, 4), ...number.slice(5)];
//  [1, 2, 3, 4, 6, 7, 8, 9, 10]

// let number=[1,2,3,4,5,6]

// numba= number.slice(0, 4);

// let newNumber = [...number]