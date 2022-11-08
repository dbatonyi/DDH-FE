# Drupal Development Helper - FE (DDH) Documentation

**Author:** dbatonyi

**Stack:** Next.js

**Main modules:** React Final Form ( Form manager ), Moment ( Format dates ), Material UI ( Table component )

## Short description:

The Drupal Development Helper (DDH) was made for help Drupal CMS based projects. The main goal was to help project managers and developers to create Drupal sites more efficiently.

The application has separeta backend and frontend.
**Backend github link:** https://github.com/dbatonyi/DDH-BE

The frontend code was created using the **Next.js** framework and written in **React**. The main function of the frontend is to **create/list tasks** and **create complex tasks in Trello** using a form.

## Setup:

Before starting the backend, you need to create a configuration file based on the example.

First create a **config.json** file in the root of the project that contains the variables needed to run the app.

Config contains two variables, a **serverUrl** that contains the URL of the API, and an **apiToken** that contains a bearer token (_without the word Bearer_) required for authentication.

You can start the application in developer mode with the following code:

    npm run dev

Build for production

    npm run build

and to run it:

    npm run start

## Backend functions:

-   User registration
-   Password reset
-   Create task
-   Edit task
-   Delete task
-   Send complex task collections to Trello API via Task Manager From

## Usable task tags:

The following task tags are implemented.

| Tag name                  | Tag description                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Install Drupal**        | This tag should be used for the tasks, that may be required to create a Drupal site.                                                                      |
| **Drupal update**         | This tag should be used for the tasks, that may be required to updating any Drupal site to a newer version.                                               |
| **External server**       | This tag should be used for the tasks, that may be required if the site is not on our own server, or needs to be migrated from another server to our own. |
| **Drupal 7**              | This tag should be used for the tasks, that may be required for updating a Drupal 7 site.                                                                 |
| **Drupal 8**              | This tag should be used for the tasks, that may be required for updating a Drupal 8 site.                                                                 |
| **Migration**             | This tag should be used for the tasks, that may be required to migrate any content from one site to another.                                              |
| **Blog**                  | This tag should be used for the tasks, that may be required to create a blog.                                                                             |
| **Webshop**               | This tag should be used for the tasks, that may be required to create a webshop.                                                                          |
| **Payment method**        | This tag should be used for the tasks, that may be required to develop the payment method of the webshop.                                                 |
| **Currency**              | This tag should be used for the tasks, that may be required to set up the payment details of the webshop.                                                 |
| **Custom webhop**         | This tag should be used for the tasks, that may be required to develop unique webshop.                                                                    |
| **Custumer registration** | This tag should be used for the tasks, that may be required to develop user registration.                                                                 |
| **Product variation**     | This tag should be used for the tasks, that may be required to develop variations of the webshop's products.                                              |
| **Invoice system**        | This tag should be used for the tasks, that may be required to develop invoice system.                                                                    |
| **Stock management**      | This tag should be used for the tasks, that may be required to develop stock management.                                                                  |
| **Stock update**          | This tag should be used for the tasks, that may be required to keep the stock of the webshop fresh.                                                       |
| **Additional currencies** | This tag should be used for the tasks, that may be required to add a new currency for the webshop.                                                        |
| **Additional VAT**        | This tag should be used for the tasks, that may be required for adding new tax types.                                                                     |
| **Coupon system**         | This tag should be used for the tasks, that may be required to develop a webshop coupon system.                                                           |
| **Product filters**       | This tag should be used for the tasks, that may be required for filtering the webshop's products.                                                         |
| **Product pages**         | This tag should be used for the tasks, that may be required to develop webshop products's details page.                                                   |
| **Layout elements**       | This tag should be used for the tasks, that may be required to develop layout element system.                                                             |
| **Flexible layout**       | This tag should be used for the tasks, that may be required to develop flexible layout system.                                                            |
| **Unique design**         | This tag should be used for the tasks, that may be required to develop the unique design.                                                                 |
| **Email template**        | This tag should be used for the tasks, that may be required to develop email templates.                                                                   |
