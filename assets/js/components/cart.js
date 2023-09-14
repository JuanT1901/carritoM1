function cart (db, printProducts) {
  let cart = [];

  const productsDOM = document.querySelector('.products__container');
  const notifyDOM = document.querySelector('.notify');
  const cartDOM = document.querySelector('.cart__body');
  const countDOM = document.querySelector('.cart__count--item');
  const totalDOM = document.querySelector('.cart__total--item');  
  const checkoutDOM =document.querySelector('.btn--buy');

  function printCart () {
    let htmlCart = '';

    if(cart.length === 0){
      htmlCart += `
        <div class="cart__empty">
        <i class='bx bxs-c art' style='color:#000'></i>
        <p class="cart__empty--text">No hay productos en el carrito</p>
        </div>
      `
      notifyDOM.classList.remove('show--notify');
    } else{
      for (const item of cart) {
        const product = db.find(p => p.id === item.id);

        htmlCart += `
        <article class="article">
        <div class="article__image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="article__content">
          <h3 class="article__title">${product.name}</h3>
          <span class="article__price">$${product.price}</span>
          <div class="article__quantity">
            <button type="button" class="article__quantity-btn article__minus" data-id='${item.id}'>
              <i class='bx bx-minus'></i>
            </button>
            <span class="article__quantity-text">${item.qty}</span>
            <button type="button" class="article__quantity-btn article__plus" data-id='${item.id}'>
              <i class='bx bx-plus'></i>
            </button>
          </div>
          <button type="button" class="article__quantity-btn remove-from-cart" data-id='${item.id}'>
            <i class='bx bx-trash'></i>
          </button>
        </div>
      </article>
        `
      }
      notifyDOM.classList.add('show--notify');
    }

    cartDOM.innerHTML = htmlCart;
    notifyDOM.innerHTML = showItemsCount();
    countDOM.innerHTML = showItemsCount();
    totalDOM.innerHTML = '$' + showTotal();
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

    printCart();
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

  printCart();

  productsDOM.addEventListener('click', function (e) {
    if(e.target.closest('.add--to--cart')) {
      const id = +e.target.closest('.add--to--cart').dataset.id;
      addToCart(id);
    }
  })

  cartDOM.addEventListener('click', function (e) {
    if(e.target.closest('.article__minus')) {
      const id = +e.target.closest('.article__minus').dataset.id;
      removeFromCart(id);
    }

    if(e.target.closest('.article__plus')) {
      const id = +e.target.closest('.article__plus').dataset.id;
      addToCart(id);
    }

    if(e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id;
      deleteFromCart(id);
    }
  })

  checkoutDOM.addEventListener('click', function () {
    checkout();
  })
}

export default cart