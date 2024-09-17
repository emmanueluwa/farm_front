export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Farm = {
  _id: string;
  user: string;
  farmName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryPrice: number;
  produce: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};
