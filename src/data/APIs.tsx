import axios from "axios";
import { Product } from "../types/Products";

const cache: { [key: string]: Product[] } = {};
const cacheCategory: { [key: string]: string[] } = {};
const cacheAll: { [key: string]: Product[] } = {};


export const fetchData = async () => {
    if (cache['https://fakestoreapi.com/products?limit=9']) {
        return cache['https://fakestoreapi.com/products?limit=9'];
    } else {
        const res = await axios.get('https://fakestoreapi.com/products?limit=9'); // fetch products with a limit of 9 products
        cache['https://fakestoreapi.com/products?limit=9'] = res.data;
        return res.data;
    }
};
export const fetchAllProducts = async () => {
    if (cacheAll['https://fakestoreapi.com/products']) {
        return cacheAll['https://fakestoreapi.com/products'];
    } else {
        const res = await axios.get('https://fakestoreapi.com/products'); //fetch all products
        cacheAll['https://fakestoreapi.com/products'] = res.data;
        return res.data;
    }
};
export const fetchProducts = async (category: string) => {
    const url = `https://fakestoreapi.com/products/category/${category}`; //fetch products based on category name
    if (cache[url]) {
        return cache[url];
    } else {
        const res = await axios.get(url);
        cache[url] = res.data;
        return res.data;
    }
};
export const fetchProduct = async (id: string) => {
    const url = `https://fakestoreapi.com/products/${id}`; // fetch products based on their product ID
    if (cache[url]) {
        return cache[url];
    } else {
        const res = await axios.get(url);
        cache[url] = res.data;
        return res.data;
    }
};

export const fetchCategories = async () => {
    if (cacheCategory['https://fakestoreapi.com/products/categories']) {
        return (cacheCategory['https://fakestoreapi.com/products/categories']);
    } else {
        const res = await axios.get('https://fakestoreapi.com/products/categories'); // fetch categories of all products
        cacheCategory['https://fakestoreapi.com/products/categories'] = res.data;
        return (res.data);
    }
};
