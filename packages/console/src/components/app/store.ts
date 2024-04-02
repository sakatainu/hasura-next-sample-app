import { atom } from 'recoil';

export const pageStore = atom<Dictionary>({
  key: 'pageStore',
  default: {},
});

export default pageStore;
