import {
  useState,
  useEffect,
  useCallback
} from "react";

export function useRecaptchaV3(publicKey) {
  const [recaptchaInitialization, setRecaptchaInitialization] = useState(false);

  useEffect(() => {
    if (window.grecaptcha) {
      setRecaptchaInitialization(true);
    } else {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${publicKey}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => setRecaptchaInitialization(true);
    }
  }, [publicKey]);

  const executionRecaptcha = useCallback(
    async (action) => {
      if (recaptchaInitialization && window.grecaptcha) {
        return await window.grecaptcha.execute(publicKey, { action });
      }
      return null;
    },
    [recaptchaInitialization, publicKey],
  );
  
  return executionRecaptcha;
};

