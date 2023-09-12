function cart (db, printProducts) {
  let cart = [];

  const productsDOM = document.querySelector('.products__container');
  const notifyDOM = document.querySelector('.notify');
  const cartDOM = document.querySelector('.cart__body');
  const countDOM = document.querySelector('.cart__count--item');
  const totalDOM = document.querySelector('.cart__total--item');  
  const checkoutDOM =document.querySelector('.btn--buy');

  function printCart () {
    console.log('Carrito :');
    console.log(cart); 
    
    if(cart.length === 0){

    } else{
      notifyDOM.classList.remove('show-notify');
    }
    notifyDOM.innerHTML = showItemsCount();
    console.log('Total ' + showTotal());
  }

  function addToCart (id, qty = 1) {
    const itemFound = cart.find(i => i.id === id);

    if(itemFound){
      itemFound.qty += qty;
    }else{
      cart.push({ id, qty });
    }
    printCart();
  }

  function removeFromCart (id, qty = 1) {
    const itemFound = cart.find(i => i.id === id);

    const result = itemFound.qty - qty;
    if(result > 0) {
      itemFound.qty -= qty;
    } else {
      cart = cart.filter(i => i.id !== id);
    }

  }

  function deleteFromCart (id) {
    cart = cart.filter(i => i.id !== id);

    printCart();
  }

  function showItemsCount () {
    let suma = 0;

    for (const item of cart) {
      suma += item.qty;
    }

    return suma;
  }

  function showTotal () {
    let total = 0;

    for (const item of cart) {
      const productFound = db.find(p => p.id === item.id);
      total += productFound.price * item.qty;
    }

    return total
  }

  function checkout () {
    for (const item of cart) {
      const productFound = db.find(p => p.id === item.id);
      
      productFound.quantity -= item.qty;
    }

    cart = [];
    printCart();
    printProducts();
    window.alert('¡Gracias por su compra!')
  }

  productsDOM.addEventListener('click', function (e) {
    if(e.target.closest('add--to--cart')) {
      const id = +e.target.closest('add--to--cart').dataset.id;
      addToCart(id);
    }
  })
}

export default cart