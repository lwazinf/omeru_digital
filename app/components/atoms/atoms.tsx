import { atom } from "recoil";

const COMPONENT_NAME = '1.0'

export const ViewState = atom({
  key: `${COMPONENT_NAME}/ViewState`,
  default: true,
});

export const PillState = atom<any>({
  key: `${COMPONENT_NAME}/PillState`,
  default: false,
});

export const SearchState = atom<any>({
  key: `${COMPONENT_NAME}/SearchState`,
  default: '',
});

export const OfferState = atom<any>({
  key: `${COMPONENT_NAME}/OfferState`,
  default: [],
});

export const CategoryState = atom<any>({
  key: `${COMPONENT_NAME}/CategoryState`,
  default: [],
});

export const CollectionState = atom<any>({
  key: `${COMPONENT_NAME}/CollectionState`,
  default: '',
});

export const TagState = atom<any>({
  key: `${COMPONENT_NAME}/TagState`,
  default: [],
});