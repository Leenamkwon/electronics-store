import url from './URL';

// flatten
export function flattenProducts(data) {
  return data.map((item) => {
    // cloudinary
    // let image = item.image.url;
    // local setup no deployment
    let image = (item.image && `${url}${item.image.url}`) || null;
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter((item) => item.featured === true);
}

export function paginate(products) {
  const itemsPerPage = 2;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage);
  // });

  const newProducts = Array.from({ length: numberOfPages }, (val, index) => {
    return products.slice(index * itemsPerPage, itemsPerPage * (index + 1));
  });

  // our code goes here
  return newProducts;
}
