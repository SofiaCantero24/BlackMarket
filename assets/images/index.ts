const images = {
  backgroundAuth: () => require("./auth/background.png"),
};

export type Images = keyof typeof images;
export default {
  ...images,
};
