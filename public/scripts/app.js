// Client facing scripts here
$(document).ready(function () {

  let cartItems = [];

  $(".add-to-cart-button").on("click", function () {
    const quantity = ($(this).siblings('.quantity')[0].value);
    const name = $(this).parent().parent().parent().find(".menu-item-name")[0].innerText;
    const description = $(this).parent().parent().parent().find(".menu-item-description")[0].innerText;
    const price = $(this).parent().parent().parent().find(".menu-item-price")[0].name;
    const instructions = $(this).parent().parent().find("#instructions").val();
    //  "Add to Cart" buttons have ID's assigned to them based on their order starting from 1. mid == "menu id"
    const mid = this.id;
    // create object to hold all item data
    const item = { mid, name, description, price, instructions, quantity };
    cartItems.push(item);

    renderCart(cartItems, '#ordered-items');

    renderCartTotals(cartItems, '#order-totals');
  })

  const renderCart = function (items, element) {
    $(element).children().remove()
    items.forEach((item, index) => {
      let elem = ``;
      if (index === 0) {
        elem = `<tr>
        <th> Name </th>
        <th> Quantity </th>
        <th> Price </th>
        <th> Special Instuctions </th>
        <th> Remove </th>
      </tr>`
      }
      elem += `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price / 100}</td>
      <td>${item.instructions}</td>
      <td> <button class="remove-button"> X </button> </td>
      </tr>`;
      $(element).append(elem)
    })
  }

  const renderCartTotals = function (items, element) {
    // clear table element
    $(element).children().remove();
    let total = 0;
    // iterate through items to find total price in dollars
    items.forEach(item => {
      total += item.quantity * item.price / 100;
    })
    //round total to 2 decimal places
    total = total.toFixed(2);
    // create HTML table element
    const elem = `<tr>
    <td>Sub-total</td>
    <td>$ ${total} </td>
    </tr>
    <tr>
    <td>Tax</td>
    <td>$ ${(total * (0.15)).toFixed(2)} </td>
    </tr><tr>
    <td>Total </td>
    <td>$ ${(total * (1.15)).toFixed(2)} </td>
    </tr>
    `
    $(element).append(elem)
  }

  $("#ordered-items").on("click", ".remove-button", function () {
    // rowIndex value of table row object in Cart. 1 is the first remove (X) button and so on...
    const rowIndex = $(this).parent().parent()[0].rowIndex
    console.log(rowIndex);
    //mutate cartItems to remove index = rowIndex -1
    cartItems.splice(rowIndex - 1, 1)
    // need to re-do Cart View
    renderCart(cartItems, '#ordered-items');

    renderCartTotals(cartItems, '#order-totals');
  })

// needs to be completed
// send below data

  $('#place-order-button').on('click', function (event) {
    //event.preventDefault()

    $.post('/api/items/orders', { 'restaurant_id': 1, 'customer_id': 1, 'tip': 0, 'order' : cartItems })

  });

});
