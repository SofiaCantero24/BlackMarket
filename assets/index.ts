const images = {
  backgroundAuth: () => require('./auth/background.png'),
  authLogo: () => require('./auth/auth-logo.png'),
  visibilityOff: () => require('./auth/visibility-off.png'),
  visibilityOn: () => require('./auth/visibility-on.png'),
};

export type Images = keyof typeof images;
export default images;
