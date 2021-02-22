# BigCommerce interview test for oBundle

## Test details

This test was broken up into three majortasks:

1. Create a product called Special Item which will be assigned to a new category called Special Items. This task included the following sub tasks:

- Add at least 2 images during the product creation.
- Create a feature that will show the product's second image when it is hovered on.

2. Add a button at the top of the category page labeled Add All To Cart and a second button called Remove All Items. This task included the following sub tasks:

- When the Add All to Cart button is clicked all items in the current category are added to the cart and the user is notified

- If there is no items in the cart the Remove All button should not be displayed. If the cart has items in it the the button should be displayed next to the add all button.

- When the Remove All button is clicked it should clear the contents of the cart and notify the user

- Both buttons should utilize the Storefront API for completion.

3. If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone ,etc). This should utilize the data that is rendered via Handlebars on the Customer Object.
