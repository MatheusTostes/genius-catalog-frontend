const products = document.getElementById('products')
const url = 'http://localhost:3000/products/'

// const createProduct = (response.data) => {
//     const {name, price, description} = response.data[0]
    
//     const productDiv = document.createElement('div')
//     const productTitle = document.createElement('h3')
//     const productPrice = document.createElement('h4')
//     const productDescription = document.createElement('h6')

//     productTitle.innerText = name
//     productPrice.innerText = price
//     productDescription.innerText = description

//     productDiv.appendChild(productTitle, productPrice, productDescription)
//     products.appendChild(productDiv)
// }

const getProducts = () => {
    axios.get(url)
    .then(response => {
        response.data.map((item) => {
        
            const productImage = document.createElement('img')
            const productDiv = document.createElement('div')
            const productTitle = document.createElement('h3')
            const productPrice = document.createElement('h4')
            const productDescription = document.createElement('h6')
    
            productImage.src = item.image
            productDiv.classList = 'product'
            productTitle.innerText = item.name
            productPrice.innerText = `R$ ${item.price}`
            productDescription.innerText = item.description
    
            productDiv.append(productImage, productTitle, productPrice, productDescription)
            products.appendChild(productDiv)
        })
    })
    .catch(error => console.log(error))
}

getProducts()