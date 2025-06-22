import { Home } from "lucide-react";
import { Armchair } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";

export const signupFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "prateek1234",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "prateek@gmail.com",
    componentType: "input",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "8299XXXXXX",
    componentType: "input",
    type: "number",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "prateek@gmail.com",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Product ID",
    name: "productId",
    componentType: "input",
    type: "text",
    placeholder: "Enter product id",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Dimensions",
    name: "dimensions",
    componentType: "input",
    type: "text",
    placeholder: "Enter product dimensions",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "brass", label: "Brass" },
      { id: "copper", label: "Copper" },
      { id: "glass", label: "Glass" },
      { id: "handicraft", label: "Handicraft" },
      { id: "metal", label: "Metal" },
      { id: "stainlessSteel", label: "Stainless Steel" },
      { id: "wood", label: "Wood" },
      { id: "furniture", label: "Furniture" },
    ],
  },
  {
    label: "Product",
    name: "product",
    componentType: "select",
    options: [
      { id: "chair", label: "Chair" },
      { id: "table", label: "Table" },
      { id: "sofa", label: "Sofa" },
      { id: "bed", label: "Bed" },
      { id: "cabinet", label: "Cabinet" },
      { id: "lamp", label: "Lamp" },
      { id: "mirror", label: "Mirror" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },

  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
  {
    id: "regalo",
    label: "Regalo",
    path: "/shop/regalo",
  },
  {
    id: "about",
    label: "About Us",
    path: "/shop/about",
  },
];

export const filterOptions = {
  category: [
    { id: "brass", label: "Brass" },
    { id: "copper", label: "Copper" },
    { id: "glass", label: "Glass" },
    { id: "handicraft", label: "Handicraft" },
    { id: "metal", label: "Metal" },
    { id: "stainlessSteel", label: "Stainless Steel" },
    { id: "wood", label: "Wood" },
    { id: "furniture", label: "Furniture" },
  ],
  product: [
    { id: "chair", label: "Chair" },
    { id: "table", label: "Table" },
    { id: "sofa", label: "Sofa" },
    { id: "bed", label: "Bed" },
    { id: "cabinet", label: "Cabinet" },
    { id: "lamp", label: "Lamp" },
    { id: "mirror", label: "Mirror" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Full Name",
    name: "fullName",
    componentType: "input",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];


