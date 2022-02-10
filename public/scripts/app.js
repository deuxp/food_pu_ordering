// Client facing scripts here
$(document).ready(function () {

  let cartItems = []; // [{}]
  // future: JSON stringify the session cookie data re-assign cart items
  // renderCart(cartItems, '#ordered-items'); for the future cookie
  // renderCartTotals(cartItems, '#order-totals'); for the future cookie


  $(".add-to-cart-button").on("click", function () {

    // when add to cart is pressed all of these items are grabbed
    // and put into an object
    const quantity = ($(this).siblings('.quantity')[0].value);
    const name = $(this).parent().parent().parent().find(".menu-item-name")[0].innerText;
    const description = $(this).parent().parent().parent().find(".menu-item-description")[0].innerText;
    const price = $(this).parent().parent().parent().find(".menu-item-price")[0].name;
    const instructions = $(this).parent().parent().find("#instructions").val();
    //  "Add to Cart" buttons have ID's assigned to them based on their order starting from 1. mID == "menu id"
    const mID = this.id;
    // create object to hold all item data
    const item = { mID, name, description, price, instructions, quantity };
    cartItems.push(item); // [{}]

    //renderCart(cartItems, '#ordered-items');

    //renderCartTotals(cartItems, '#order-totals');

    renderEntireCart(cartItems, '#ordered-items');
  })

  const renderEntireCart = function (items, element) {
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

    let total = 0;
    // iterate through items to find total price in dollars
    items.forEach(item => {
      total += item.quantity * item.price / 100;
    })
    //round total to 2 decimal places
    total = total.toFixed(2);
    // create HTML table element
    const ele = `
    <tr> <td> </td> </tr>
    <tr> <td> </td> </tr>
    <tr>
    <td> <strong>Sub-total </strong></td>
    <td>      </td>
    <td>$ ${total} </td>
    </tr>
    <tr>
    <td><strong>Tax </strong></td>
    <td>      </td>
    <td>$ ${(total * (0.15)).toFixed(2)} </td>
    </tr><tr>
    <td><strong>Total </strong> </td>
    <td>      </td>
    <td>$ ${(total * (1.15)).toFixed(2)} </td>
    </tr>
    `
    $(element).append(ele)
  }

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
      <td>$${(item.price /100)}</td>
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

  // the following listener removes items from the cart
  $("#ordered-items").on("click", ".remove-button", function () {
    // rowIndex value of table row object in Cart. 1 is the first remove (X) button and so on...
    const rowIndex = $(this).parent().parent()[0].rowIndex
    console.log(rowIndex);
    //mutate cartItems to remove index = rowIndex -1
    cartItems.splice(rowIndex - 1, 1)
    // need to re-do Cart View
    //renderCart(cartItems, '#ordered-items');

    //renderCartTotals(cartItems, '#order-totals');
    renderEntireCart(cartItems, '#ordered-items');

  })

  /** TODO
   * - [X] send info to router
   *  - [ ] place-order should clear the order list and totals
   *
   * then
   * - [ ] pop up bubble: your order has been placed that dissappears
   *
   */
  $('#place-order-button').on('click', function (event) {
    event.preventDefault();
    $.post({
      data: { 'restaurant_id': 1, 'tip': 0, 'order' : cartItems },
      url: '/api/items/orders',
      success: location.reload()
    })
    .catch(err => console.log(err.message))
  });

});
