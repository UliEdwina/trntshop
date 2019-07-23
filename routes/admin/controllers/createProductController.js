let Product = require('../../product/models/Product')


module.exports = {
    createProductByCategoryID: (req, res) => {
        for (let i = 0; i < 10; i++) {
            let newProduct = new Product()
    
            newProduct.category = req.params.categoryID
            newProduct.name     = productName()
            newProduct.price    = price()
            newProduct.image    = image()
    
            newProduct.save()
        }

        req.flash('createProductsSuccess', `Fake ${ req.params.categoryName } 10 products created!`)

        res.redirect('/api/admin/get-all-categories')
    }
}