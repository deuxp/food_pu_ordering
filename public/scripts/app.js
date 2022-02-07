// Client facing scripts here
$(document).ready(function () {

  let orderedItems = [];

  $(".menu-button").on("click", function (event) {
    //const price = $(this).siblings('.menu-item-price').text();
    const price = $(this).siblings('.menu-item-price')[0].name;
    const name = $(this).parent().parent().children('.menu-item-details-left-top').children('.menu-item-name').text();

    addItemsToInvoice(trackOrderedItems(this.id, name, price), '#table-ordered-items');
  });

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

  const addItemsToInvoice = function (items, element) {
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


});
