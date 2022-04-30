const products = document.getElementById('products')
const url = 'https://catalognodejs2022.vercel.app/products/'
const cart = document.getElementById('aside-position')
const aside = document.getElementById('cart')
const main = document.getElementById('main')
const itemsCart = {}
let totalValue = 0
let cartCount = document.getElementById('cart-count')
let itemsCount = 0
const totalValueElement = document.getElementById('total-value')
const btnCloseOrder = document.getElementById('close-order')
const cartIcon = document.getElementsByClassName('bx-cart')[0]

const getProducts = async () => {
    products.innerText = "CARREGANDO..."
    const response = await axios.get(url)
    products.innerText = ""
    response.data.map((item) => {
        
        const productImage = document.createElement('img')
        const productDiv = document.createElement('div')
        const productTitle = document.createElement('h3')
        const productPrice = document.createElement('h4')
        const productDescription = document.createElement('h6')
        const btnBuy = document.createElement('button')

        productImage.src = item.image
        productImage.classList = 'item-image'
        productDiv.classList = 'product'
        productTitle.innerText = item.name
        productTitle.classList = 'item-name'
        productPrice.innerText = `R$ ${item.price}`
        productPrice.classList = 'item-price'
        productDescription.innerText = item.description
        btnBuy.innerText = 'COMPRAR'
        btnBuy.addEventListener('click', getItem)

        productDiv.append(productImage, productTitle, productPrice, productDescription, btnBuy)
        products.appendChild(productDiv)
    })
}

const getItem = (event) => {
    const item = event.target.parentElement
    const image = item.querySelector('.item-image').src
    const name = item.querySelector('.item-name').innerText
    const price = parseFloat(item.querySelector('.item-price').innerText.replace('R$ ',''))
    let qty = ''
    if (!(Object.keys(itemsCart).includes(name))) {
        qty = 1
    } else {
        qty = itemsCart[name].qty + 1
    }
    const itemObj = { image, name, price, qty}
    itemsCart[itemObj.name] = itemObj

    createItemCart()
}

const createItemCart = () => {
    let items = ''
    Object.keys(itemsCart).forEach((itemName) =>{
        const {image, name, qty, price} = itemsCart[itemName]
        const item = `
        <div class="item-cart">
            <div class="cart-image">
                <img src=${image} alt="">
            </div>
            <div class="item-text">
                <h3 class="item-name">${name}</h3>
                <h5>Quantidade:</h5>
                <div class="qty">
                    <button class="minus-item" onClick='minusItem(event)'>-</button>
                    <h5>${qty}</h5>
                    <button class="plus-item" onClick='plusItem(event)'>+</button>
                </div>
            </div>
            <div class="total-item-value">
                <h5>Total: </h5>
                <h4 class="total-item-price">R$ ${(qty*price).toFixed(2)}</h4>
            </div>
            <button class="item-delete" onClick='deleteItem(event)'>X</button>
        </div>

        `
        items += item
    })
    cart.innerHTML='<h1>Minha sacola</h1>'
    cart.insertAdjacentHTML( 'beforeend', items )

    calculateTotalValue()

    btnCloseOrder.addEventListener('click', createWhatsLink())

    countItemsCart()

}

const plusItem = (event) => {
    const itemName = event.target.parentElement.parentElement.querySelector('.item-name').innerText;
    itemsCart[itemName].qty += 1

    createItemCart()
}

const minusItem = (event) => {
    const itemName = event.target.parentElement.parentElement.querySelector('.item-name').innerText;
    itemsCart[itemName].qty -= 1

    if (itemsCart[itemName].qty === 0) {
        delete itemsCart[itemName]
    }

    createItemCart()
}

const deleteItem = (event) => {
    const itemName = event.target.parentElement.parentElement.querySelector('.item-name').innerText;
    itemsCart[itemName].qty = 0

    delete itemsCart[itemName]

    createItemCart()
}

const calculateTotalValue = () => {
    totalValue = 0
    Object.keys(itemsCart).forEach((item) => {
        const itemValue = itemsCart[item].price * itemsCart[item].qty
        totalValue += itemValue
    })
    totalValueElement.innerText = `R$ ${totalValue.toFixed(2)}`
}

const createWhatsLink = () => {
    const urlHeader = `
        https://api.whatsapp.com/send?phone=5527998851973&text=
        *COMANDA*%20%0a`
    let urlItems = ''
    
    Object.keys(itemsCart).forEach((item) => {
        const qty = itemsCart[item].qty
        const name = itemsCart[item].name

        urlItems += `${qty}x%20-%20_${name}_%20%0a`
    })

    const urlTotal = `
        %0a*TOTAL:%20R$%20${totalValue.toFixed(2)}*%20%20%0a%0a
    `

    const urlPix = `
        _chave%20pix%20(celular):%2027%2099885-1973_
    `

    const url = urlHeader + urlItems + urlTotal + urlPix

    btnCloseOrder.parentElement.href = url
    btnCloseOrder.parentElement.target = '_blank'
}

const countItemsCart = () => {
    itemsCount = 0
    Object.keys(itemsCart).forEach((item) => {
        itemsCount += itemsCart[item].qty
    })

    cartCount.innerText = itemsCount
}

const toggleAside = () => {
    let state = aside.style.display
    if (state === 'none') {
        aside.style.display = 'flex'
        main.style.display = 'none'
    } else {
        aside.style.display = 'none'
        main.style.display = 'flex'
    }
}

cartIcon.addEventListener('click', toggleAside)

getProducts()