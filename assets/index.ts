const images = {
  backgroundAuth: () => require('./auth/background.png'),
  authLogo: () => require('./auth/auth-logo.png'),
  visibilityOff: () => require('./auth/visibility-off.png'),
  visibilityOn: () => require('./auth/visibility-on.png'),
  header: () => require('./header.png'),
  search: () => require('./search.png'),
  dummyProduct: () => require('./dummy-product.png'),
  filterIcon: () => require('./filter_list.png'),
  trashIcon: () => require('./trash.png'),
  plusIcon: () => require('./plus.png'),
};

export type Images = keyof typeof images;
export default images;
