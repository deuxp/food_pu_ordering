Food Ordering App
=========

## YUMRs

YUMRs is a web application that allows a user to login and order food, and receive text notifications on the status of their order.

## Final Product
!["screenshot of landing page"]()
!["screenshot of menu page"]()
!["screenshot of chef's page"]()

## Dependencies
- chalk
- cookie-session
- dotenv
- ejs
- express
- morgan
- pg
- sass
- twilio

## Getting Started 
- create a [twilio](https://www.twilio.com/try-twilio) free trial account 
- in your .env file add TWILIO_ACCOUNT_SID=[your_sid], TWILIO_AUTH_TOKEN=[your_toker], PHONE_TWILIO=[your_twilio_number], PHONE_RECIEVE=[your_twilio_number], and PHONE_RESTAURANT=+1[your_phone_number]
- in 01_users.sql (in the seeds folder) edit the file to add your own phone number and save the file
- in your terminal run `npm run db:reset`
- now you will recieve text alerts to your phone number from twilio
