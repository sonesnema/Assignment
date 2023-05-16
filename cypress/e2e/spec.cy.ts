describe("Shopping cart", () => {
  beforeEach(() => {
    cy.visit("https://react-shopping-cart-67954.firebaseapp.com/");
  });

  it("displays all products with images, titles, and prices", () => {
    cy.get("div").each((product) => {
      cy.wrap(product)
        .find("[alt]")
        .should('have.length.greaterThan', 0)
      
    });
  });
});
/// <reference types="cypress" />

describe('Add to Cart Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should add a product to the cart', () => {
    cy.get('[data-cy=product]').first().within(() => {
      const productName = cy.get('[data-cy=product-name]').invoke('text')
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button
      addToCartButton.click()

      // Verify that the product is added to the cart
      cy.get('[data-cy=cart-item]').should('contain', productName)
    })
  })
})
/// <reference types="cypress" />

describe('Cart Icon Update Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should update the cart icon with the correct number of items', () => {
    // Get the initial cart count
    let initialCartCount: number
    cy.get('[data-cy=cart-icon]').then((cartIcon) => {
      initialCartCount = parseInt(cartIcon.text())
    })

    // Add a product to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button
      addToCartButton.click()
    })

    // Verify that the cart icon updates with the correct number of items
    cy.get('[data-cy=cart-icon]').should('have.text', (initialCartCount + 1).toString())
  })
})

/// <reference types="cypress" />

describe('Quantity Increase Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should increase the quantity in the cart for multiple items of the same product', () => {
    // Add the same product twice to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button twice
      addToCartButton.click()
      addToCartButton.click()
    })

    // Verify that the quantity in the cart is increased correctly
    cy.get('[data-cy=cart-item]').first().within(() => {
      cy.get('[data-cy=cart-item-quantity]').should('have.text', '2')
    })
  })
})

/// <reference types="cypress" />

describe('Cart Page Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should display the correct products, quantities, and prices on the cart page', () => {
    // Add a product to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button
      addToCartButton.click()
    })

    // Go to the cart page
    cy.get('[data-cy=cart-icon]').click()
    cy.url().should('include', '/cart')

    // Verify that the cart page displays the correct product, quantity, and price
    cy.get('[data-cy=cart-item]').should('have.length', 1).first().within(() => {
      const productName = cy.get('[data-cy=cart-item-name]').invoke('text')
      const productQuantity = cy.get('[data-cy=cart-item-quantity]').invoke('text')
      const productPrice = cy.get('[data-cy=cart-item-price]').invoke('text')

      // Assert the expected values for the product, quantity, and price
      cy.get('[data-cy=cart-item-name]').should('contain', productName)
      cy.get('[data-cy=cart-item-quantity]').should('contain', productQuantity)
      cy.get('[data-cy=cart-item-price]').should('contain', productPrice)
    })
  })
})
/// <reference types="cypress" />

describe('Cart Subtotal and Total Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should calculate the cart subtotal and total accurately', () => {
    // Add two products to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button twice
      addToCartButton.click()
      addToCartButton.click()
    })

    // Go to the cart page
    cy.get('[data-cy=cart-icon]').click()
    cy.url().should('include', '/cart')

    // Get the price and quantity of each product
    const product1Price = cy.get('[data-cy=cart-item]').first().find('[data-cy=cart-item-price]').invoke('text')
    const product1Quantity = cy.get('[data-cy=cart-item]').first().find('[data-cy=cart-item-quantity]').invoke('text')
    const product2Price = cy.get('[data-cy=cart-item]').eq(1).find('[data-cy=cart-item-price]').invoke('text')
    const product2Quantity = cy.get('[data-cy=cart-item]').eq(1).find('[data-cy=cart-item-quantity]').invoke('text')

    // Calculate the expected subtotal and total
    const subtotal = product1Price.then((price1: string) => {
      const quantity1 = parseInt(product1Quantity)
      const price1Number = parseFloat(price1.replace('$', ''))
      const product1Total = quantity1 * price1Number

      return product2Price.then((price2: string) => {
        const quantity2 = parseInt(product2Quantity)
        const price2Number = parseFloat(price2.replace('$', ''))
        const product2Total = quantity2 * price2Number

        return product1Total + product2Total
      })
    })

    // Verify that the cart page displays the correct subtotal and total
    cy.get('[data-cy=cart-subtotal]').should('have.text', subtotal.then((subtotalValue: number) => `$${subtotalValue.toFixed(2)}`))
    cy.get('[data-cy=cart-total]').should('have.text', subtotal.then((subtotalValue: number) => `$${(subtotalValue + 5).toFixed(2)}`))
  })
})
/// <reference types="cypress" />

describe('Cart Quantity Update Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should allow users to update the quantity of items in the cart', () => {
    // Add a product to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button
      addToCartButton.click()
    })

    // Go to the cart page
    cy.get('[data-cy=cart-icon]').click()
    cy.url().should('include', '/cart')

    // Update the quantity of the item in the cart
    cy.get('[data-cy=cart-item]').first().within(() => {
      const quantityInput = cy.get('[data-cy=cart-item-quantity-input]')
      const updateButton = cy.get('[data-cy=cart-item-quantity-update-button]')

      // Update the quantity to 2
      quantityInput.clear().type('2')
      updateButton.click()
    })

    // Verify that the quantity in the cart is updated correctly
    cy.get('[data-cy=cart-item]').first().within(() => {
      cy.get('[data-cy=cart-item-quantity]').should('contain', '2')
    })
  })
})
/// <reference types="cypress" />

describe('Cart Item Removal Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should allow users to remove items from the cart', () => {
    // Add a product to the cart
    cy.get('[data-cy=product]').first().within(() => {
      const addToCartButton = cy.get('[data-cy=add-to-cart-button]')

      // Click the "Add to Cart" button
      addToCartButton.click()
    })

    // Go to the cart page
    cy.get('[data-cy=cart-icon]').click()
    cy.url().should('include', '/cart')

    // Remove the item from the cart
    cy.get('[data-cy=cart-item]').first().within(() => {
      const removeButton = cy.get('[data-cy=cart-item-remove-button]')

      // Click the remove button
      removeButton.click()
    })

    // Verify that the item is removed from the cart
    cy.get('[data-cy=cart-item]').should('not.exist')
  })
})

describe('Multiple Filters Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should filter products by size and color', () => {
    cy.get('[data-cy=size-filter]').select('M') // Select the size "M" from the filter dropdown
    cy.get('[data-cy=color-filter]').select('Blue') // Select the color "Blue" from the filter dropdown

    // Verify that only products with size "M" and color "Blue" are displayed
    cy.get('[data-cy=product]').each((product) => {
      cy.wrap(product).find('[data-cy=size]').should('contain', 'M')
      cy.wrap(product).find('[data-cy=color]').should('contain', 'Blue')
    })
  })

  it('should display all products when no filters are selected', () => {
    // Verify that all products are displayed initially
    cy.get('[data-cy=product]').should('have.length', 9)

    // Select the default option "-- Select Size --" from the size filter dropdown
    cy.get('[data-cy=size-filter]').select('-- Select Size --')

    // Select the default option "-- Select Color --" from the color filter dropdown
    cy.get('[data-cy=color-filter]').select('-- Select Color --')

    // Verify that all products are displayed again
    cy.get('[data-cy=product]').should('have.length', 9)
  })
})
describe('Size Filtering Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
  })

  it('should filter products by size', () => {
    cy.get('[data-cy=size-filter]').select('L') // Select the size "L" from the filter dropdown

    // Verify that only products with size "L" are displayed
    cy.get('[data-cy=product]').each((product) => {
      cy.wrap(product).find('[data-cy=size]').should('contain', 'L')
    })
  })

  it('should display all products when no size is selected', () => {
    // Verify that all products are displayed initially
    cy.get('[data-cy=product]').should('have.length', 9)

    // Select the default option "-- Select Size --" from the filter dropdown
    cy.get('[data-cy=size-filter]').select('-- Select Size --')

    // Verify that all products are displayed again
    cy.get('[data-cy=product]').should('have.length', 9)
  })
})





