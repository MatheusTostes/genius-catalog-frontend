const products = document.getElementById('products')
const url = 'https://catalognodejs2022.vercel.app/products/'

const getProducts = () => {
    axios.get(url)
    .then(response => {
        response.data.map((item) => {
        
            const productImage = document.createElement('img')
            const productDiv = document.createElement('div')
            const productTitle = document.createElement('h3')
            const productPrice = document.createElement('h4')
            const productDescription = document.createElement('h6')
            const btnBuy = document.createElement('button')
    
            productImage.src = item.image
            productDiv.classList = 'product'
            productTitle.innerText = item.name
            productPrice.innerText = `R$ ${item.price}`
            productDescription.innerText = item.description
            btnBuy.innerText = 'COMPRAR'
    
            productDiv.append(productImage, productTitle, productPrice, productDescription, btnBuy)
            products.appendChild(productDiv)
        })
    })
    .catch(error => console.log(error))
}

getProducts()