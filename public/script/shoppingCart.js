// document.addEventListener("DOMContentLoaded", () => {
//     const itemPriceElements = document.querySelectorAll(".itemPrice");
//     const subTotalElement = document.getElementById("subTotal");
//     const totalCartValueElement = document.getElementById("totalCartValue");
//     const checkoutPriceElement = document.getElementById("checkoutPrice");

//     const total = Array.from(itemPriceElements).reduce((sum, item) => {
//         return sum + parseFloat(item.textContent.replace('$', ''));
//     }, 0);

//     const totalText = `$${total.toFixed(2)}`;

//     subTotalElement.textContent = totalText;
//     totalCartValueElement.textContent = totalText;
//     checkoutPriceElement.textContent = totalText;
// });
