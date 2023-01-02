import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import AnimatedSplashScreen from "./AnimatedSplashScreen";

export default function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = useState(false);
  
    useEffect(() => {
      console.log(image.uri)
      async function prepare() {
        setSplashReady(true);
      }
  
      prepare();
    }, [image]);
  
    if (!isSplashReady) {
      return null;
    }
  
    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
  }