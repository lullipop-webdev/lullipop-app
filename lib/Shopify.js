const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection(handle = 'frontpage', sortOption) {
  var sortQuery = ''
  if(sortOption != null){
    var reverseValue = (sortOption == 'PRICE_LOW' || sortOption == 'TITLE_DESC') ? false : true;
    const key = ((sortOption == 'PRICE_LOW' || sortOption == 'PRICE_HIGH') ? 'PRICE' : ( (sortOption == 'TITLE_ASC' || sortOption == 'TITLE_DESC') ? 'PRICE' : sortOption));
    sortQuery = `, sortKey: ${key}, reverse: ${reverseValue}`;
  }

  const query = `
  {
    collection(handle: "${handle}") {
      title
      products(first: 25 ${sortQuery}) {
        edges {
          node {
            id
            title
            handle
            createdAt
            priceRange {
              minVariantPrice {
                amount
              }
            }
            productType
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  console.log("response", response);
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}

// export async function getCollections(limit = 3) {
//   const query = `{
//     collections(first: ${limit}) {
//       edges {
//         node {
//           id
//           handle
//           title
//           description
//           image {
//             url
//             altText
//           }
//         }
//       }
//     }
//   }`;
export async function getCollectionAvailableFilters(handle = 'frontpage') {
  const query = `{
    collection(handle: "${handle}") {
      handle
      products(first: 10) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }`;
  const response = await ShopifyData(query);
  const filters = response.data.collection.products.filters
    ? response.data.collection.products.filters
    : [];

  return filters;
}

// export async function getCollections(limit = 3) {
//   const query = `{
//     collections(first: ${limit}) {
//       edges {
//         node {
//           id
//           handle
//           title
//           description
//           image {
//             url
//             altText
//           }
//         }
//       }
//     }
//   }`;

//   const response = await ShopifyData(query);
//   const collections = response.data.collections.edges
//     ? response.data.collections.edges
//     : [];

//   return collections;
// }

export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function searchAllProducts(keyword) {
  const query = `{
    products(query: "${keyword}", first: 250) {
      edges {
        node {
          handle
          id
          title
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          productType
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}


export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.product
    ? response.data.product
    : [];

  return product;
}

export async function createCheckout(id, quantity, data, defaultAddress) {
  console.log(data)
  console.log(defaultAddress)
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}],
        email: "${data.email}",
        shippingAddress: {
          address1: "${defaultAddress.address1}",
          address2: "${defaultAddress.address2}",
          city: "${defaultAddress.city}",
          country: "${defaultAddress.country}",
          firstName: "${data.firstName}",
          lastName: "${data.lastName}",
          province: "${defaultAddress.province}",
          zip: "${defaultAddress.zip}"
        }
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data?.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  console.log(checkout)
  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.data?.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function updateCheckoutShippingAddress(id, data, newShippingAddress) {
  const query = `
  mutation {
    checkoutShippingAddressUpdateV2(checkoutId: "${id}", shippingAddress: {
      address1: "${newShippingAddress.address1}",
        address2: "${newShippingAddress.address2}",
        city: "${newShippingAddress.city}",
        country: "${newShippingAddress.country}",
        firstName: "${data.firstName}",
        lastName: "${data.lastName}",
        province: "${newShippingAddress.province}",
        zip: "${newShippingAddress.zip}"
    }) {
      checkout {
        id
        webUrl
        shippingAddress
      }
    }
  }`;
  const response = await ShopifyData(query);

  const checkout = response.data?.checkoutLineItemsReplace.checkout
    ? response.data.checkoutShippingAddressUpdateV2.checkout
    : [];

  return checkout;
}

export async function createCart(lineItems){
  const query = `
  mutation {
    cartCreate(
      input: {
        lines: ${lineItems}
      }
    ) {
      cart {
        checkoutUrl
        id
      }
    }
  }
  `;
  const response = await ShopifyData(query);

  const cart = response.data.cartCreate.cart
    ? response.data.cartCreate.cart
    : [];

  return cart;
}

export async function recursiveCatalog(cursor = "", initialRequest = true) {
  let data;

  if (cursor !== "") {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      console.log("Cursor: ", cursor);

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  }
}

export async function customerCreate(email, password, firstName, lastName, marketing) {
  const query = `
    mutation {
      customerCreate(input: {
        email: "${email}",
        password: "${password}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        acceptsMarketing: ${marketing}
      }) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function customerAccessTokenCreate(email, password) {
  const query = `
    mutation {
      customerAccessTokenCreate(input: {
        email: "${email}",
        password: "${password}"
      }) {
        customerUserErrors {
          message
        }
        customerAccessToken {
          accessToken 
          expiresAt
        }
      }
    }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function getCustomerDetails(accessToken) {
  const query = `{
    customer(customerAccessToken: "${accessToken}") {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }
  `

  const response = await ShopifyData(query);

  const customer = response.data.customer
    ? response.data.customer
    : [];

  return customer;
}

export async function getCustomerOrders(accessToken) {
  const query = `
  {
  	customer(customerAccessToken: "${accessToken}") {
      orders(first: 10) {
        nodes {
          orderNumber
          fulfillmentStatus
          statusUrl
          processedAt
          lineItems(first: 10) {
            edges {
              node {
                discountedTotalPrice {
                  amount
                }
                quantity
                title
                variant {
                  title
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function customerAddressCreate(address1, address2, city, country, province, zip, accessToken) {
  const query = `
    mutation {
      customerAddressCreate(address: {
        address1: "${address1}",
        address2: "${address2}",
        city: "${city}",
        country: "${country}",
        province: "${province}",
        zip: "${zip}"
      }, customerAccessToken: "${accessToken}") {
        customerAddress {
          id
        }
        customerUserErrors {
          message
        }
      }
    }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function getCustomerAddresses(accessToken) {
  const query = `
    {
  	customer(customerAccessToken: "${accessToken}") {
      addresses(first: 10) {
        nodes {
          id
          formatted
          address1
          address2
          city
          province
          country
          zip
        }
      }
    }
  }
  `

  const response = await ShopifyData(query);

  const customerAddresses = response.data.customer
    ? response.data.customer.addresses.nodes
    : [];

  return customerAddresses;
}

export async function markAsCustomerDefaultAddress(addressId, accessToken) {
  const query =  `
  mutation {
    customerDefaultAddressUpdate(addressId: "${addressId}", customerAccessToken: "${accessToken}") {
      customer {
        # Customer fields
        defaultAddress {
          formatted
        }
      }
      customerUserErrors {
        message
        # CustomerUserError fields
      }
    }
  }  
  `
  const response = await ShopifyData(query);

  return response;

}

export async function getCustomerDefaultAddress(accessToken) {
  const query = `
  {
    customer(customerAccessToken: "${accessToken}") {
      defaultAddress {
        id
        address1
        address2
        city
        country
        province
        zip
      }
    }
  }
  `

  const response = await ShopifyData(query);
  
  if(response.data.customer !== null) {
    return response.data?.customer.defaultAddress;
  }
  
  return response
}

// export async function associateCustomertoCheckout(checkoutId, accessToken) {
//   const query = `
//   mutation {
//     checkoutCustomerAssociateV2(checkoutId: "${checkoutId}", customerAccessToken: "${accessToken}") {
//       checkout {
//         id
//       }
//       checkoutUserErrors {
//         code
//         field
//         message
//       }
//       customer {
//         id
//       }
//     }
//   }  
//   `
// }

export async function getCollections() {
  const query = `
  {
    collections(first: 3) {
      edges {
        node {
          handle
          title
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
  `

  const response = await ShopifyData(query);
  const collections = response.data.collections
    ? response.data.collections.edges
    : [];

  return collections;
}

export async function updateCustomerDetails(acceptsMarketing, email, firstName, lastName, phone, accessToken) {
  const query = `
    mutation {
      customerUpdate(customer: {
        acceptsMarketing: ${acceptsMarketing},
        email: "${email}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        phone: "${phone}"
      },
      customerAccessToken: "${accessToken}") {
        customer {
          id
        }
        customerUserErrors {
          message
        }
      }
    }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function customerRecover(email) {
  const query = `
  mutation {
    customerRecover(email: "${email}") {
      customerUserErrors {
        # CustomerUserError fields
        code
        field
        message
      }
    }
  }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function resetCustomerPasswordByUrl(password, resetUrl) {
  const query = `
  mutation {
    customerResetByUrl(password: "${password}", resetUrl: "${resetUrl}") {
      customer {
        # Customer fields
        id
        email
      }
      customerAccessToken {
        # CustomerAccessToken fields
        accessToken
      }
      customerUserErrors {
        # CustomerUserError fields
        message
      }
    }
  }
  `

  const response = await ShopifyData(query);

  return response;
}

export async function customerAddressUpdate(address1, address2, city, country, province, zip, accessToken, addressId) {
  const query = `
  mutation {
    customerAddressUpdate(address: {
        address1: "${address1}",
        address2: "${address2}",
        city: "${city}",
        country: "${country}",
        province: "${province}",
        zip: "${zip}"
      }, customerAccessToken: "${accessToken}", id: "${addressId}") {
      customerAddress {
        # MailingAddress fields
        id
      }
      customerUserErrors {
        # CustomerUserError fields
        message
      }
    }
  }
  `

  const response = await ShopifyData(query);

  return response;
}