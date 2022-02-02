# mid-term

# Collaborators - Github:

---

- alisonharman
- brianaendanawas

# INTRO

---

### **Option 10: Food Pick-up Ordering**

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as [Twilio](https://www.twilio.com/) to implement SMS communication from the website to the client and restaurant.

For inspiration check out how [Ritual](https://www.ritual.co/) works, but keep in mind that's implemented as a native app and serves more than one restaurant.

# Communication

---

![Untitled](mid-term%20d8727ce9820d427b9cbfb2ecb7b83481/Untitled.png)

- daily scrum → **Inspection and Adaption**
    - As described in the [Scrum Guide](https://www.scrumguides.org/), the purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and adapt the [Sprint Backlog](https://www.scrum.org/resources/what-is-a-sprint-backlog) as necessary, adjusting the upcoming planned work.
        
        
- what channels
    - ZOOM live chat
    - DISCORD
- collaborative board
    - ill figure this out
- planning folder
- times to check in
    - daily scrum
        - MONDAY 1100
            - TUES - THURS 1000
    - group code review
- group mentor sessions
- git project board
- where to host the main branch

# Project Choices

---

Focus on user generated content?

1. Wiki Map
    - challenge: api map connection and reproduction
2. Quiz App
    1. challenge: sql database heavy
    2. lots of time making up questions → dev gen content +1
3. Story Creator
    1. what would we use to help out the user
        1. hints: on names, places, suggested events
            1. dev gen content +1
4. Decision Maker
    1. Math is not that complex ? 
        1. its like a 3 tier’d voting system
            1. but also we have to adjust the rating based on match as well
                1. larger score weighted on a match
5. PasswordKeepR *Zzzzz
    1. I like
6. Smart TODO List * tentative yes
    1. I like this; 
    2. Challenge: multiple api requests, servers
        1. impressive when it works?
            1. what order to call these api’s in
            2. how do we determine the api verifying the word as an entity/object/intellectual property
7. Resource Wall *
    1. Challenge: filtering and finding
        1. categorizing what you are looking for
8. Buy/Sell Listing Website → X
    1. buy/ sell tigers
        1. Challenge: message each other, mark as sold, database BREAD
9. Schoodle → X Zzzzzz
    1. planning a meeting
10. Food Pick-up Ordering ***
    1. UI client
        1. UI owner
            1. TWILLIO api → send to phone #

# User Stories

---

As a ______, I want to ______, because ______.

as a customer, I want to 

1. order food, because I’m hungry and 
2.  or I want food that I dont know how to make;
    1. Generic landing page -with menu items - super minimal
        1. customer choice - dashboard
            1. present the choice
                1. restaurant page the menu
                    1. keep track of the order items - invoice - dynamic SPA
                        1. takes you to the secure check-out page
        2. Owner - dashboard - super static, but visually pleasing
            1. see multiple invoice
            2. dashboard - form
                1. personalized messages - Twilio
                2. restaurants profile
                3. hours
                4. update if they are out of menu items
                5. add specials ***
3. and I want it ASAP - lazy

## 5 main Views

---

1. Generic landing page — VIEW

- nav bar
- menu items
  - loggin in
  - view account
  - order history
  - log out

2. customer choice dashboard — VIEW
3. restaurant template — VIEW
    1. dynamic item add 
        1. quantity
        2. special instruction
    2. dynamic order list — SPA jQ then x out
4. secure checkout page VIEW
5. owner dashboard VIEW
    1. simple, but elegant form
6. partials
    1. decide what partials are reusable
    
7. Server Page
    1. router pages
8. Helper Functions
9. Database
10. Planning Folder
11. SASS
12. README.md

# Q&A

---

# ERD

---

1. users (1 to many)
    1. ID
    2. name
    3. address
    4. phone
    5. email
    6. password
2. restaurants (1 to many)
    1. ID
    2. name
    3. password
    4. description
    5. address
    6. phone number
    7. email
    8. hours
3. users_restaurants (linking) m2m → favourites
4. menu items (many2one)
    1. ID
    2. item title
    3. description
    4. price
    5. restaurant_id
    6. available - bool
5. orders (linking m2m)
    1. ID
    2. user_id
    3. restaurant_id
    4. menu_item_id
    5. tax
    6. tip
    7. total
    8. timestamp
6. menu_items_orders
    1. ID
    2. menu_item_id
    3. order_id
7. ratings (many2one)
    1. ID
    2. user_id ?
    3. restaurant_id

NOTE: need to keep track of the feature add instruction to the order.. should be done in JS and just disappear.. OR should there be a table linking that way the order can be disputed

# Routes → BREAD .. {endpoints}

---

# Wireframes

---

![Wire-frame-example.png](mid-term%20d8727ce9820d427b9cbfb2ecb7b83481/Wire-frame-example.png)

![wireframe1.png](mid-term%20d8727ce9820d427b9cbfb2ecb7b83481/wireframe1.png)

# SPA or Multipage app (server-side rendering)

---

# Tech choices

---

# Git

---

- we all have our own branch like our own personal main (not the main-main)
    - build branches off of your main
        - merge with your personal main
            - this is what we will use for the pulls
                - pull once a day

# Should we Deploy ?


## CHEFS page

- [] how many minutes
- [] which phone sending to
- [] display order

## schema

```sql

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal VARCHAR(255) NOT NULL,
  credit VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  open INTEGER NOT NULL,
  close INTEGER NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  available BOOLEAN NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  instructions VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  time TIMESTAMP,
  tip INTEGER
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id REFERENCES orders(id) ON DELETE CASCADE,
  item_id REFERENCES items(id) ON DELETE CASCADE,
  modification VARCHAR(255)
);

```
