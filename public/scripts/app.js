// Client facing scripts here
$(document).ready(function () {

  let cartItems = []; // [{}]

  //AS soon as the page loads the cartItems are updated with the saved cookie
  // unpacks the JSON order from the session-cookie -- then updates the above var;
  $.get({
    url: '/api/items/cookie-data',
  })
  .then(data => {
    // cartItems = data
    cartItems = JSON.parse(data)
  })

  // throw the cart refresh in the event loop to display updated cookie on refresh
  setTimeout(() => {
    renderCart(cartItems, '#ordered-items');
  }, 100);


  $(".add-to-cart-button").on("click", function () {

    // when add to cart is pressed all of these items are grabbed
    // and put into an object
    const quantity = ($(this).siblings('.quantity')[0].value);
    const name = $(this).parent().parent().parent().find(".menu-item-name")[0].innerText;
    const description = $(this).parent().parent().parent().find(".menu-item-description")[0].innerText;
    const price = $(this).parent().parent().parent().find(".menu-item-price")[0].name;
    // const instructions = $(this).parent().parent().find("#instructions").val();
    //  "Add to Cart" buttons have ID's assigned to them based on their order starting from 1. mID == "menu id"
    const mID = this.id;
    // create object to hold all item data
    const item = { mID, name, description, price, instructions, quantity };

    const innerinstructions = $(this).parent().parent().find("#instructions");
    const instructions = innerinstructions.val();

    // update local
    cartItems.push(item); // [{}]
    innerinstructions.val('')
    // update the session
    $.post({
      url: '/api/items/order-cart',
      data: { cartItems },
    })
    .then(cart => {
      const updatedCart = JSON.parse(cart)
      console.log('\tsuccess: ', updatedCart)
      renderCart(cartItems, '#ordered-items') // could even still use the local // cookies are there for refresh
    })
  })


// ================================================================================

  // td = table data || tr = table row
  const renderCart = function (items, element) {
    $(element).children().remove()
    items.forEach((item, index) => {

      let elem = ``;
      // 1. guard for empty elem
      if (index === 0) {
        elem = `<tr>
        <th> Name </th>
        <th> Quantity </th>
        <th> Price </th>
        <th> Special Instuctions </th>
        <th> Remove </th>
      </tr>`
      }

      // 2. builds elem from one item obj
      elem += `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price / 100}</td>
      <td>${item.instructions}</td>
      <td> <button class="remove-button"> X </button> </td>
      </tr>`;

      // 3. appends the elem to a table DOM
      $(element).append(elem) //
    })

    // calculates the total
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
    // append table element to the end
    $(element).append(ele)
  }

  // ================================================================================









  // the following listener removes items from the cart
  $("#ordered-items").on("click", ".remove-button", function () {
    // rowIndex value of table row object in Cart. 1 is the first remove (X) button and so on...
    const rowIndex = $(this).parent().parent()[0].rowIndex
    console.log(rowIndex);

    // removes locally
    // cartItems remove index = rowIndex -1
    cartItems.splice(rowIndex - 1, 1)

    // updates the session
    $.post({
      url: '/api/items/remove-item',
      data: { cartItems },
    })
    .then(cart => {
      // const updatedCart = JSON.parse(cart)
      console.log('\tsuccess removed item: ', cart)
      renderCart(cartItems, '#ordered-items')
    })


  })

  /** Helper Function:
   * Purpose: pops out the "rder has been placed" bubble
   * @param {''} elem element to slide up and down
   * @param {*} delay slide back up
   */
  const slideClear = (elem, delay) => {
    elem.slideDown('fast', () => {
      setTimeout(() => {
        elem.slideUp('fast')
      }, 3000)
    })
    setTimeout(() => {
      window.location.reload()
    },delay)
  }

  $('#place-order-button').on('click', function (event) {
    event.preventDefault();
    const $thank = $('.thank-you')
    $.post({
      data: { 'restaurant_id': 1, 'tip': 0, 'order' : cartItems },
      url: '/api/items/orders',
      success: slideClear($thank, 4000)
      // success: window.location.reload()
    })
    .catch(err => console.log(err.message))
  });

  // helper function
  // const refresh = delay => {
  //   setTimeout(() => {
  //     window.location.reload()
  //   }, delay);
  // }

});
