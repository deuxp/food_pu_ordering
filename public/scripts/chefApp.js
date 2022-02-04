
$('document').ready(() => {


  $('.ready-button').on('click', e => {
    e.preventDefault();
    $.ajax('/api/chefs/ping', { method: 'POST' })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        res
        .status(500)
        .json({error: err.message})})
  })

    //////////////////////
    // helper functions //
    //////////////////////

  /** -=-=---=-----=-- -- - =  -= -=-=---=-----=-- -- - =  -=
   * Purpose: builds a DOM element -> order item
   * Behaviour: to be used inside of the billTicket()
   * Author: Gottfried Kleinberger
   * @param {{}} item a single queried item object that the customer ordered
   * @param {''} element class or id to append to
   */
  const billItem = function(item, element) {
    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const elem = `<div class="order-view">
    <div class="food-name">${item.name}</div>
    <div class="food-instructions">${item.modification}</div>
    <div class="food-qty">qty: ${item.qty}</div>
    </div>`;
    $(element).append(elem)
  };

  /** -=-=---=-----=-- -- - =  -= -=-=---=-----=-- -- - =  -=
   * Purpose: to append a list of objects to a DOM element
   * Author: Gottfried Kleinberger
   * @param {[{}]} items
   * @param {''} element class or id name you want to append the DOM Elements
   */
  const billTicket = (items, element) => {
    items.forEach(item => {
      billItem(item, element)
    });
  };

  /////////////////////////////
  // Listener: Pending Order //
  /////////////////////////////

  $('.pending-button').on('click', e => {
    e.preventDefault()
    $('article').removeClass('hidden')

    // need to sanitize STILL!! ++++++++++++++++++++++++++
    const order = $('#order-number').val()
    $.ajax({
      method: 'POST',
      data: {'id': order},
      url: '/api/chefs/pending',
      name: 'pending'
    })
    .then(items => {
      // idempotent insurance: clear bill of duplicates first
      $('article').children().remove()
      billTicket(items, '.chit');
    })
    .catch(err => {console.error('wha happun')})
  })

  //////////////////////////////
  // listener: time-remaining //
  //////////////////////////////

  $('.time-remaining-button').on('click', function(e) {
    e.preventDefault()
    const $value = $('.time-remaining').val()
    console.log($value)
    $.ajax({
      method: 'POST',
      url: '/api/chefs/time',
      name: 'time',
      data: {'time': $value}
    })
    .catch(err => console.error(err.stack))
  });


});




