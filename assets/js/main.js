import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import products from './components/products.js'
import getProducts from './helpers/getProduct.js'
import cart from './components/cart.js'

// Ocultar loader
loader()

//Mostrar menú
showMenu()

//Mostrar carrito
showCart()

//Products
const {db, printProducts} = products(await getProducts())

//Cart
cart(db, printProducts)