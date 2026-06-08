export interface Product {
  id: number;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  cpu?: string;
  ram?: string;
  os?: string;
  displayResolution?: string;
  displaySize?: string;
  battery?: string;
  primaryCamera?: string;
  secondaryCmera?: string;
  dimentions?: string;
  weight?: string;
  internalMemory?: Storage[];
  options?: ProductOptions;
}

export interface ProductOptions {
  colors: { code: number; name: string }[];
  storages: { code: number; name: string }[];
}

export interface CartItem {
  id: number;
  colorCode: number | null;
  storageCode: number | null;
}