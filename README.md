# BigCommerce interview test for oBundle

## Test details

Link to Store: [https://my-store419.mybigcommerce.com/?ctk=049cc94d-9f1f-4e4a-a615-ff44a60b4bc1](https://my-store419.mybigcommerce.com/?ctk=049cc94d-9f1f-4e4a-a615-ff44a60b4bc1)

Preview Code: 1sc56ju21s

This test was broken up into three majortasks. You will find links to all of the created and edited files below in the description:

1. **Create a product called Special Item which will be assigned to a new category called Special Items. This task included the following sub tasks:**

- Add at least 2 images during the product creation.
- Create a feature that will show the product's second image when it is hovered on.

**Task 1 completion details**

- Added the new category and item along with product details and pictures via the BigCommerce store web portal

- Added event listener to the thumbnail container on the category page via stencil. This was accomplished by editing the [category.js](assets/js/theme/category.js) file. During a mouseover event the image element is changd to the second image and stays on that image until the page is reloaded to prevent a large number of image reloads.

---

2. Add a button at the top of the category page labeled Add All To Cart and a second button called Remove All Items. This task included the following sub tasks:

- When the Add All to Cart button is clicked all items in the current category are added to the cart and the user is notified

- If there is no items in the cart the Remove All button should not be displayed. If the cart has items in it the the button should be displayed next to the add all button.

- When the Remove All button is clicked it should clear the contents of the cart and notify the user

- Both buttons should utilize the Storefront API for completion.

**Task 2 completion details**

- An additional component template was created that included a container with both buttons in it called [add-all-bar.html](templates/components/custom/add-all-bar.html). This component was added to [category.html](templates/pages/category.html).

- Styling for this custom template can be found in a new scss file called [added-styles.sscss](assets/scss/custom/added-styles.scss) a custom class was added to toggle the "Remove All" buttons visibility via JavaScript.

- All logic for this component was added to the [category.js](assets/js/theme/category.js) file. This logic includes adding and removing the custom visibility class, event listeners for button clicks, and all of the API calls for adding items and emptying the cart

- An additional component called [add-delete-alert.js](templates/components/custom/add-delete-alert.html) was created to notify the user that "Cart has been updated!". This is an alert style popup. The logic for this can also be found in [category.js](assets/js/theme/category.js). This component was added to [add-all-bar.html](templates/components/custom/add-all-bar.html).

---

3. If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone ,etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

**Task 3 completion details**

- A new component was created called [customer-banner.html](templates/components/custom/customer-banner.html). The component displays the customers name, email, and country location if there is a customer logged in. The component is not rendered if there is no customer logged in. This component was added to [category.html](templates/pages/category.html).

- Component is conditionally displayed if there is customer data provided to Handlebars via a Handlebars `if` statement.
