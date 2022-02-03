// Client facing scripts here
$(document).ready(function() {

  let orderedItems = {};

  $(".menu-button").on("click", function(event) {
    //console.log("A button has been clicked");
    //console.log(event);
    //console.log(this.id);
    //console.log($(this).siblings('p').text());
    const price = $(this).siblings('.menu-item-price').text();
    const name = $(this).parent().parent().children('.menu-item-details-left-top').children('.menu-item-name').text();

    console.log(trackOrderedItems(this.id, name, price));
  });

  const trackOrderedItems = function(buttonID, name, price) {
    //console.log(buttonID, name, price);

    if (!orderedItems[buttonID]) {
      orderedItems[buttonID] = {id: buttonID, name: name, price: price, quantity: 1}
    } else {
      let qty = orderedItems[buttonID]["quantity"];
      orderedItems[buttonID] = {id: buttonID, name: name, price: price, quantity: qty+1};
    }

    return orderedItems;

  }

});
