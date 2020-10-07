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
  const itemsPerPage = 4;
  const pages = Math.ceil(products.length / itemsPerPage);

  // our code goes here
  return products.slice(0, itemsPerPage);
}
