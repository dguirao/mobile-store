export interface ProductSpecs {
  screen?: string;
  resolution?: string;
  processor?: string;
  mainCamera?: string;
  selfieCamera?: string;
  battery?: string;
  storage?: string;
  ram?: string;
  operatingSystem?: string;
  screenRefreshRate?: string;
  dimensions?: string;
  weight?: string;
}

export interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
  description?: string;
  specs?: ProductSpecs;
  colors?: Color[];
  internalMemory?: Storage[];
}

export interface Color {
  code: number;
  name: string;
}

export interface Storage {
  code: number;
  name: string;
}

export interface CartItem {
  id: number;
  colorCode: number;
  storageCode: number;
}
