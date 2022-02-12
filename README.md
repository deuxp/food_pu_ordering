Food Ordering App
=========

## YUMRs

YUMRs is a web application that allows a user to login and order food, and receive text notifications on the status of their order.

## Final Product
!["screenshot of landing page"](https://raw.githubusercontent.com/deuxp/food_pu_ordering/ec0f34e723494c4f58121dc76f361a6eb9214241/public/assets/imgs/landing-screenshot.png)
!["screenshot of menu page"](https://raw.githubusercontent.com/deuxp/food_pu_ordering/ec0f34e723494c4f58121dc76f361a6eb9214241/public/assets/imgs/menu-screenshot.png)
!["screenshot of chef's page"](https://raw.githubusercontent.com/deuxp/food_pu_ordering/ec0f34e723494c4f58121dc76f361a6eb9214241/public/assets/imgs/chefs-screenshot.png)

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
- in your .env file add: TWILIO_ACCOUNT_SID=[your_sid], TWILIO_AUTH_TOKEN=[your_token], PHONE_TWILIO=[your_twilio_number], PHONE_RECIEVE=[your_twilio_number], and PHONE_RESTAURANT=+1[your_phone_number]
- in 01_users.sql (in the seeds folder) edit the file to have your own phone number and save the file
- in your terminal run `npm run db:reset`
- when logging in enter `Alice` or `Raymond`
- now you will recieve text alerts to your phone number from twilio
