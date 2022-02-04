

    // ready button -> should
  // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
$('document').ready(() => {


  $('.ready-button').on('click', e => {
    // prevent default
    e.preventDefault();
    // console.log('are we there yet?')
    $.ajax('/api/chefs/ping', { method: 'GET' })
      .then(data => {
        console.log(data)
      })
      .catch(err => res.send(err.message))
  })



  /**
   *
   * @param {[{}]} items the queried list of item objects that the customer ordered
   */
  const billItem = function(item) {

    // it will loop in the other helper function
    // so just concern yourself with on e elem
    // { id: 1, name: burg, modification: 'sdfsdf, qty: 0.00}

    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const elem = `<div class="order-view">
    <div class="food-name">${item.name}</div>
    <div class="food-instructions">${item.modification}</div>
    <div class="food-qty">qty: ${item.qty}</div>
    </div>`

    // ghost burger
  $( ".chit" ).append(elem)
  };

  const billTicket = items => {
    items.forEach(item => {
      billItem(item)
    });
  }



  $('.pending-button').on('click', e => {
    e.preventDefault()

    // extract form data
    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const order = $('#order-number').val()

    $.ajax({method: 'POST', data: {'id': order}, url: '/api/chefs/pending', name: 'pending'})
    .then(items => {
      // what do I do with the items ??
      // helper function
      billTicket(items);
    })
    .catch(err => {console.error('wha happun')})
  })


});




