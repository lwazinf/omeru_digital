import { atom } from "recoil";

const COMPONENT_NAME = '1.0'

export const UserState = atom<any>({
  key: `${COMPONENT_NAME}/UserState`,
  default: null,
});

export const BucketState = atom<any>({
  key: `${COMPONENT_NAME}/BucketState`,
  default: "2L",
});

export const AdminState = atom<any>({
  key: `${COMPONENT_NAME}/AdminState`,
  default: false,
});

export const MobileTrayState = atom<any>({
  key: `${COMPONENT_NAME}/MobileTrayState`,
  default: false,
});

export const PaidState = atom<any>({
  key: `${COMPONENT_NAME}/PaidState`,
  default: false,
});

export const OfferState2 = atom<any>({
  key: `${COMPONENT_NAME}/OfferState2`,
  default: null,
});

export const CartState = atom<any>({
  key: `${COMPONENT_NAME}/CartState`,
  default: false,
});

export const SideBarState = atom<any>({
  key: `${COMPONENT_NAME}/SideBarState`,
  default: true,
});

export const ProductsState = atom<any>({
  key: `${COMPONENT_NAME}/ProductsState`,
  default: [],
});

export const ViewState = atom({
  key: `${COMPONENT_NAME}/ViewState`,
  default: true,
});

export const PillState = atom<any>({
  key: `${COMPONENT_NAME}/PillState`,
  default: false,
});

export const ViewItemState = atom<any>({
  key: `${COMPONENT_NAME}/ViewItemState`,
  default: false,
});

export const CurrentItemState = atom<any>({
  key: `${COMPONENT_NAME}/CurrentItemState`,
  default: {name: "", display: ""},
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