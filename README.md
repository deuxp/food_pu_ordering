# YUMRs

---

## Food Ordering App

YUMRs is a web application that allows a user to login and order food, and receive SMS text notifications on the status of their order. There is also a UI for the restaurant side, to update their customer on the status of their order via SMS.

This project is for educational purposes only. Enjoy!

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
1. create a [twilio](https://www.twilio.com/try-twilio) free trial account 
1. in your .env file add the following: 
  1. TWILIO_ACCOUNT_SID=[your_sid],
  1. TWILIO_AUTH_TOKEN=[your_token],
  1. PHONE_TWILIO=[your_twilio_number],
  1. PHONE_RECIEVE=[your_twilio_number],
  1. PHONE_RESTAURANT=+1[your_phone_number]
1. in 01_users.sql (in the seeds folder) edit the file to have your own phone number and save the file
1. in your terminal run `npm run db:reset`
1. when logging in enter `Alice` or `Raymond`
1. now you will recieve text alerts to your phone number from twilio
