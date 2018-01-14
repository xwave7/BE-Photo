# B&E Photo
This is a full stack project used as the private photographic exhibition hosted on [https://mighty-falls-57151.herokuapp.com/](https://mighty-falls-57151.herokuapp.com/)

### Features

For this web app, users could do the following operations,

- sign up and login an account to do operations with **authenciation**
- **upload** the photographies so that every could appreciate them, **edit or delete** photographies only if this photo submiited by owners, **edit or delete** the comment only if the comment submitted by owners.
- comment others photographies and this comment could be edited or deleted by owners

### Technology

- Implemented **NodeJS**, **Express** and **MongoDB** to construct the whole framework
- For front-end work, **Boostrap** is used to make every items look better and the format **EJS** is added to explain the javascript logic
- For back-end work, **Mongoose** is used to connect the MongoDB, which could store the users' accounts and all information about photos
- Used **Passport.JS** to build the authenciation
- Conneted with MongoLab(renamed as **mLab** now) to host MongoDB
- This project was totally hosted on **Heroku**