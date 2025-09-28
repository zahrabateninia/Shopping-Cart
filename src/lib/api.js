const BASE_URL = "https://fakestoreapi.com/products";


export async function fetchProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/**
 * @param {number} id
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return res.json();
}


export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products in ${category}`);
  return res.json();
}
