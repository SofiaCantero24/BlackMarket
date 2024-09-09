import images from "@/assets/images";
import { ImageBackground, View } from "react-native";

export default function SignUp() {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="stretch"
      source={images.backgroundAuth()}
    >
      <View></View>
    </ImageBackground>
  );
}
