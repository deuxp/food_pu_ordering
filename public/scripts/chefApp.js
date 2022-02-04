

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
   *  To be used inside of the billTicket -- builds the element to be appended
   * @param {{}} items a single queried item object that the customer ordered
   */
  const billItem = function(item) {
    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const elem = `<div class="order-view">
    <div class="food-name">${item.name}</div>
    <div class="food-instructions">${item.modification}</div>
    <div class="food-qty">qty: ${item.qty}</div>
    </div>`
    // ghost burger
  $( ".chit" ).append(elem)
  };

  /**
   * The purposes of this function is to append a list of objects to a DOM element
   * @param {[{}]} items
   */
  const billTicket = items => {
    items.forEach(item => {
      billItem(item)
    });
  }


  // order pending
  $('.pending-button').on('click', e => {
    e.preventDefault()

    $('article').removeClass('hidden')
    // extract form data
    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const order = $('#order-number').val()
    $.ajax({method: 'POST', data: {'id': order}, url: '/api/chefs/pending', name: 'pending'})
    .then(items => {
      // clear bil first
      $('article').children().remove()
      // helper function
      billTicket(items);
    })
    .catch(err => {console.error('wha happun')})
  })


  // listener for time remaining button
  // with .prev() sibling traversal on this to find the value instad of re-targeting with an id.. but if it doesn't work too well then use an id target
  $('.time-remaining-button').on('click', function(e) {
    e.preventDefault()
    const $value = $('.time-remaining').val()
    console.log($value)
    // ajax post to /time
    $.ajax({method: 'POST', url: '/api/chefs/time', name: 'time', data: {'time': 55}})
    .catch(err => console.error(err.stack))

  })


});




