// Client facing scripts here
$(document).ready(function () {

  let orderedItems = [];

  $(".menu-button").on("click", function (event) {
    //const price = $(this).siblings('.menu-item-price').text();
    const price = $(this).siblings('.menu-item-price')[0].name;
    const name = $(this).parent().parent().children('.menu-item-details-left-top').children('.menu-item-name').text();

    renderItemsToInvoice(trackOrderedItems(this.id, name, price), '#ordered-items');

    renderTotals(orderedItems,'#order-totals');
  });

  $(".add-to-cart-button").on("click", function(event){
    //console.log("I am clicked!")
    const quantity = ($(this).siblings('.quantity')[0].value);
    const name = $(this).parent().parent().parent().find(".menu-item-name")[0].innerText;
    const description = $(this).parent().parent().parent().find(".menu-item-description")[0].innerText;
    const price = $(this).parent().parent().parent().find(".menu-item-price")[0].name;
    const instructions = $(this).parent().parent().find("#instructions").val();
  })

  const doesItemExist = function (buttonID, orderedItems) {
    let exists = false;
    orderedItems.forEach(item => {
      if (item["content"].id === buttonID) {
        exists = true;
      }
    })
    return exists;
  };

  const trackOrderedItems = function(buttonID, name, price) {

    const itemExists = doesItemExist(buttonID, orderedItems);

    if (itemExists) {
      orderedItems.forEach((item, index) => {
        if (item["content"].id === buttonID) {
          // what is the current number of items
          const numOfItems = item["content"].quantity
          orderedItems[index]["content"].quantity = numOfItems + 1;
        }
      })
    }
    else {
      orderedItems.push({ content: { id: buttonID, name: name, price: price, quantity: 1 } })
    }
    return orderedItems;
  };

  const renderItemsToInvoice = function (items, element) {
    $(element).children().remove()
    items.forEach( (item, index) => {
      let elem =``;
      if (index === 0) {
        elem = `<tr>
        <th> Name </th>
        <th> Quantity </th>
        <th> Price </th>
      </tr>`
      }
      elem += `<tr>
      <td>${item["content"].name}</td>
      <td>${item["content"].quantity}</td>
      <td>$${item["content"].price/100}</td>
      </tr>`;
      $(element).append(elem)
    })
  };

  const renderTotals = function(items, element) {
    $(element).children().remove();

    let total = 0;

    items.forEach( item => {
      total += item["content"].quantity*item["content"].price/100;
    })

    //round total to 2 decimal places
    total = total.toFixed(2);

    console.log('total', total);
    const elem = `<tr>
    <td>Sub-total</td>
    <td>$ ${total} </td>
    </tr>
    <tr>
    <td>Tax</td>
    <td>$ ${(total*(0.15)).toFixed(2)} </td>
    </tr><tr>
    <td>Total </td>
    <td>$ ${(total*(1.15)).toFixed(2)} </td>
    </tr>
    `
    $(element).append(elem)
  }
});
