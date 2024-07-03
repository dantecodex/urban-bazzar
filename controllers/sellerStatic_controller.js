import Order from "../models/order_models.js"
import User from "../models/user_models.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

const sellerHomepage = asyncErrorHandler(async (req, res) => {
    res.render("seller_homepage", { seller: req.seller })
})

const sellerSignupPage = asyncErrorHandler(async (req, res) => {
    res.render("seller_signup")
})

const sellerLoginPage = asyncErrorHandler(async (req, res) => {
    res.render("seller_login")
})
const sellerAddProductPage = asyncErrorHandler(async (req, res) => {
    res.render("seller_add_product", { seller: req.seller })
})

const sellerListedProductPage = asyncErrorHandler(async (req, res) => {
    res.render("seller_listed_product", { seller: req.seller })
})

// const sellerDashboard = asyncErrorHandler(async (req, res) => {
//     const { productsListed, productsSold } = req.seller

//     const soldProductsIds = new Set(productsSold.map(product => product.productID.toString()))

//     const soldProducts = productsListed.filter(listedProduct => {
//         return soldProductsIds.has(listedProduct._id.toString())
//     })

//     const orders = await Order.find({ _id: { $in: productsSold.map(product => product.orderID) } })

//     const soldProductsItem = orders.flatMap(order => order.items.filter(item => soldProductsIds.has(item.productID.toString())))

//     soldProducts.itemSold = soldProductsItem
//     const sellerStats = {

//         totalProductSoldQuantity: soldProductsItem.reduce((acc, item) => {
//             return acc + item.quantity
//         }, 0),

//         totalProductSoldPrice: soldProductsItem.reduce((acc, item) => {
//             return acc + item.totalPrice
//         }, 0),

//         get avgPricePerOrder() {
//             return this.totalProductSoldQuantity > 0 ? this.totalProductSoldPrice / this.totalProductSoldQuantity : 0;
//         }
//     }


//     res.render("seller_dashboard", { seller: req.seller, soldProducts, sellerStats })
// }) 

const sellerDashboard = asyncErrorHandler(async (req, res) => {
    const { productsSold } = req.seller;

    const soldProductsIds = new Set(productsSold.map(obj => obj.productID.toString()));

    // Find all orders related to the sold products
    const orders = await Order.find({ _id: { $in: productsSold.map(product => product.orderID) } });

    // Find all users who made these orders
    const userIds = [...new Set(orders.map(order => order.userID.toString()))];
    const users = await User.find({ _id: { $in: userIds } });

    // Create a mapping from userID to user details
    const userMap = new Map(users.map(user => [user._id.toString(), user]));

    // Find all sold products items
    const soldProductsItem = orders.flatMap(order => order.items.filter(item => soldProductsIds.has(item.productID.toString())));

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Create an array of unique objects containing the required information
    const userOrderDetails = orders.flatMap(order => {
        return order.items.filter(item => soldProductsIds.has(item.productID.toString())).map(item => {
            const user = userMap.get(order.userID.toString());
            return {
                userName: user.name,
                userAddress: user.address,
                orderID: order._id,
                item,
                purchaseDate: order.createdAt.toLocaleDateString("en-IN", dateOptions),
                totalQuantity: item.quantity,
                totalPrice: item.totalPrice
            };
        });
    });

    userOrderDetails.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

    const sellerStats = {
        totalProductSoldQuantity: soldProductsItem.reduce((acc, item) => acc + item.quantity, 0),
        get avgPricePerOrder() {
            return (this.totalProductSoldQuantity > 0 ? this.totalProductSoldPrice / this.totalProductSoldQuantity : 0).toFixed(2);
        },
        totalProductSoldPrice: soldProductsItem.reduce((acc, item) => acc + item.totalPrice, 0),
    };

    res.render("seller_dashboard", {
        seller: req.seller,
        sellerStats,
        userOrderDetails
    });
});


export {
    sellerHomepage, sellerSignupPage, sellerLoginPage,
    sellerAddProductPage, sellerListedProductPage, sellerDashboard
}