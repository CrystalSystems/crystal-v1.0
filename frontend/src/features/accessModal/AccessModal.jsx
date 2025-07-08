import {
  useState,
  useEffect,
  useRef
} from "react";
import { Link } from "react-router-dom";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { useForm } from "react-hook-form";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  useTranslation,
  Trans
} from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { httpClient } from "../../shared/api";
import {
  EnterIcon,
  ClosedEyeSecondVersionIcon,
  EyeIconSecondVersionIcon
} from '../../shared/ui';
import { setShowAccessModal } from "./accessModalSlice";
import { setSwitchAccessModal } from "./accessModalSlice";
import { setlogInStatus } from "../../features/auth/logInStatusSlice";

// -- reCAPTCHA v3
// import { useRecaptchaV3 } from "../../shared/hooks";
// import {
//  RECAPTCHA_V3_PUBLIC_KEY
//  } from "../../shared/constants";
// -- /reCAPTCHA v3

import styles from "./AccessModal.module.css";

export function AccessModal() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const queryClient = useQueryClient();

  // -- reCAPTCHA v3
  // const recaptchaV3 = useRecaptchaV3(
  //   RECAPTCHA_V3_PUBLIC_KEY,
  //   "register"
  // );
  // -- /reCAPTCHA v3

  // yup validationSchema
  // log in validation
  const validationSchemaLogIn = Yup.object().shape({
    email: Yup.string()
      .email("AccessModal.InputErrorEmailEmpty")
      .required("AccessModal.InputErrorEmailEmpty")
      .max(100, "AccessModal.InputErrorEmailMaximumLength"),
    password: Yup.string()
      .required("AccessModal.InputErrorPasswordEmpty")
      .matches(
        /^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/,
        "AccessModal.InputErrorPasswordMinimumMaximumLengthSymbols"
      ),
  });
  // /log in validation

  // register validation
  const validationSchemaRegister = Yup.object().shape({
    name: Yup.string().max(
      200,
      "AccessModal.InputErrorNameMaximumLength"
    ),
    customId: Yup.string()
      .trim()
      .nullable()
      .matches(/^[a-zA-Z0-9-_]{1,35}$/, {
        excludeEmptyString: true,
        message:
          "AccessModal.InputErrorIdMinimumMaximumLengthSymbols",
      }),
    email: Yup.string()
      .email("AccessModal.InputErrorEmailEmpty")
      .required("AccessModal.InputErrorEmailEmpty")
      .max(100, "AccessModal.InputErrorEmailMaximumLength"),
    password: Yup.string()
      .required("AccessModal.InputErrorPasswordEmpty")
      .matches(
        /^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/,
        "AccessModal.InputErrorPasswordMinimumMaximumLengthSymbols"
      ),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "AccessModal.InputErrorAcceptTerms"
    ),
  });
  // /register validation

  // /yup validationSchema

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fadeOut, setFadeOut] = useState(false);
  const { showAccessModal, switchAccessModal } = useSelector((state) => state.accessModal);

  // click tracking outside the modal
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      const handler = (e) => {
        if (!modalRef.current.contains(e.target)) {
          setFadeOut(true);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });
  // /click tracking outside the modal

  // useForm log in
  const {
    register: useFormLogIn,
    reset: logInFormReset,
    handleSubmit: handleSubmitLogIn,
    watch: watchLogInForm,
    formState: { errors: errorsLogIn },
  } = useForm(
    {
      resolver: yupResolver(validationSchemaLogIn),
    },
    {
      mode: "onChange",
    }
  );

  // log in
  const logIn = useMutation({
    mutationKey: ['logIn'],
    mutationFn: async (values) => {
      return httpClient.post("/auth/login", values);
    },

    onSuccess: () => {
      dispatch(setShowAccessModal(false));
      dispatch(setlogInStatus(true));
      window.localStorage.setItem('logIn', true);
      logInFormReset();
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },

    onError: (response) => {
      setLogInServerErrors(response.error);
    },

  });
  // /log in

  const [
    watchEmailLogForm,
    watchPasswordLogForm
  ] = watchLogInForm(["email", "password"]);

  const [logInServerErrors, setLogInServerErrors] = useState();

  const onSubmitLogIn = async (values) => {
    queryClient.invalidateQueries({
      queryKey: ['me'],
    });
    logIn.mutate(values);
  };
  // /useForm log in

  // useForm register
  const {
    register: useFormRegister,
    reset: registerFormReset,
    handleSubmit: handleSubmitRegister,
    watch: watchRegisterForm,
    formState: { errors: errorsRegister },
  } = useForm(
    {
      resolver: yupResolver(validationSchemaRegister),
    },
    {
      mode: "onChange",
    }
  );

  // register
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (values) => {
      return httpClient.post("/auth/register", values);
    },

    onSuccess: () => {
      dispatch(setShowAccessModal(false));
      dispatch(setSwitchAccessModal(true));
      registerFormReset();
      dispatch(setlogInStatus(true));
      window.localStorage.setItem('logIn', true);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },

    onError: (response) => {
      setRegisterServerErrors(response.error);
    },

  });
  // /register

  const [
    watchEmailRegForm,
    watchPasswordRegForm,
  ] = watchRegisterForm(["email", "password"]);

  const [registerServerErrors, setRegisterServerErrors] = useState();

  const onSubmitRegister = async (values) => {
    // -- reCAPTCHA v3
    // const recaptchaV3Token = await recaptchaV3("register");
    // values["recaptchaV3Token"] = recaptchaV3Token;
    // -- /reCAPTCHA v3
    queryClient.invalidateQueries({
      queryKey: ['me'],
    });
    register.mutate(values);
  };
  // /useForm register

  // hide body scroll when modal is open
  useEffect(() => {
    showAccessModal ?
      (document.body.style.overflow = "hidden")
      :
      (document.body.style.overflow = "auto");
  }, [showAccessModal]);
  // /hide body scroll when modal is open

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  return (
    <>
      {showAccessModal && (
        <div
          className={
            fadeOut
              ? `${styles.modal_background} ${styles.modal_background_fade_out}`
              : styles.modal_background
          }
          data-access-modal-dark-theme={darkThemeStatus}>
          <div
            className={
              fadeOut
                ? `${styles.modal_wrap} ${styles.modal_wrap_fade_out}`
                : `${styles.modal_wrap}`
            }
            onAnimationEnd={(e) => {
              if (e.animationName === styles.fadeOut) {
                dispatch(setShowAccessModal(!showAccessModal));
                setFadeOut(false);
              }
            }}
          >
            <div
              onClick={() => {
                setLogInServerErrors("");
                setRegisterServerErrors("");
              }}
              ref={modalRef}
              className={styles.modal}
            >
              <div className={styles.switch_modal}>
                <button
                  onClick={() => {
                    dispatch(setSwitchAccessModal(true));
                  }}
                  className={
                    switchAccessModal
                      ? `${styles.switch_modal_active}`
                      : null
                  }
                >
                  {t("AccessModal.SwitchLogIn")}
                </button>
                <button
                  onClick={() => {
                    dispatch(setSwitchAccessModal(false));
                  }}
                  className={
                    switchAccessModal
                      ? null
                      : `${styles.switch_modal_active}`
                  }
                >
                  {t("AccessModal.SwitchSignUp")}
                </button>
              </div>
              <div className={styles.access_form_wrap}>
                {switchAccessModal ? (
                  // logIn form
                  <form onSubmit={handleSubmitLogIn(onSubmitLogIn)}>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='emailLogin'
                        label="email"
                        type="email"
                        placeholder="Email"
                        {...useFormLogIn("email")}
                      />
                      <div className={styles.access_input_errors}>
                        {errorsLogIn.email && (
                          <p>{t(errorsLogIn.email.message)}</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.access_input_errors_wrap}>
                      <div className={styles.password_wrap}>
                        <input
                          className={styles.password}
                          key='passwordLogin'
                          type={showLoginPassword ? "text" : "password"}
                          label="password"
                          autoComplete="on"
                          placeholder={t(
                            "AccessModal.InputPasswordLogIn"
                          )}
                          {...useFormLogIn("password")}
                        />
                        <div
                          onClick={() => { setShowLoginPassword(!showLoginPassword) }}
                          className={styles.show_password}
                        >
                          {showLoginPassword ? <EyeIconSecondVersionIcon /> : <ClosedEyeSecondVersionIcon />}
                        </div>
                      </div>
                      <div className={styles.access_input_errors}>
                        {errorsLogIn.password && (
                          <p>{t(errorsLogIn.password.message)}</p>
                        )}
                      </div>
                      {logInServerErrors === "invalid username or password" && (
                        <div className={styles.access_input_errors_server}>
                          <p>
                            {t(
                              "AccessModal.InputErrorEmailPasswordWrong"
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    {(watchEmailLogForm && watchPasswordLogForm) && (
                      <button className={styles.enter} type="submit">
                        <EnterIcon />
                      </button>
                    )}
                  </form>
                ) : (
                  // /logIn form
                  // Register form
                  <form onSubmit={handleSubmitRegister(
                    onSubmitRegister
                  )}
                  >
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='nameRegister'
                        {...useFormRegister("name")}
                        label={t(
                          "AccessModal.InputNameSignUp"
                        )}
                        type="text"
                        placeholder={t(
                          "AccessModal.InputNameSignUp"
                        )}
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegister.name && (
                          <p>{t(errorsRegister.name.message)}</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='idRegister'
                        {...useFormRegister("customId")}
                        label="Id"
                        type="text"
                        placeholder="Id"
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegister.customId && (
                          <p>{t(errorsRegister.customId.message)}</p>
                        )}
                      </div>
                      {registerServerErrors ===
                        "This Id already exists" && (
                          <div className={styles.access_input_errors_server}>
                            <p>
                              {t(
                                "AccessModal.InputErrorIdAlreadyExists"
                              )}
                            </p>
                          </div>
                        )}
                    </div>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        autoComplete="off"
                        key='emailRegister'
                        {...useFormRegister("email")}
                        label="* Email"
                        type="email"
                        placeholder="* Email"
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegister.email && (
                          <p>{t(errorsRegister.email.message)}</p>
                        )}
                      </div>
                      {registerServerErrors ===
                        "This email already exists" && (
                          <div className={styles.access_input_errors_server}>
                            <p>
                              {t(
                                "AccessModal.InputErrorEmailAlreadyExists"
                              )}
                            </p>
                          </div>
                        )}
                    </div>
                    <div className={styles.access_input_errors_wrap}>
                      <div className={styles.password_wrap}>
                        <input
                          autoComplete="off"
                          className={styles.password}
                          key='passwordRegister'
                          {...useFormRegister("password")}
                          label={t(
                            "AccessModal.InputPasswordSignUp"
                          )}
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder={t(
                            "AccessModal.InputPasswordSignUp"
                          )}
                        />
                        <div
                          onClick={() => { setShowRegisterPassword(!showRegisterPassword) }}
                          className={styles.show_password}
                        >
                          {showRegisterPassword ? <EyeIconSecondVersionIcon /> : <ClosedEyeSecondVersionIcon />}
                        </div>
                      </div>
                      <div className={styles.access_input_errors}>
                        {errorsRegister.password && (
                          <p>{t(errorsRegister.password.message)}</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.access_terms_errors_wrap}>
                      <div className={styles.access_terms_wrap}>
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          defaultChecked={true}
                          type="checkbox"
                          {...useFormRegister("acceptTerms")}
                        />
                        <label
                          className={styles.access_terms}
                          htmlFor="acceptTerms"
                        >
                          <p>
                            <Trans i18nKey="AccessModal.Terms">
                              1
                              <Link
                                to={"/terms"}
                                target="_blank"
                                rel="noreferrer"
                              ></Link>
                              <Link
                                to={"/privacy"}
                                target="_blank"
                                rel="noreferrer"
                              ></Link>
                              <Link
                                to={"/cookies-policy"}
                                target="_blank"
                                rel="noreferrer"
                              ></Link>
                            </Trans>
                          </p>
                        </label>
                      </div>
                      <div className={styles.access_input_errors}>
                        {errorsRegister.acceptTerms && (
                          <p>{t(errorsRegister.acceptTerms.message)}</p>
                        )}
                      </div>
                      {/* -- reCAPTCHA v3 */}
                      {/* <div className={styles.recaptcha_protected_message}>
                        <p>
                          This site is protected by reCAPTCHA and the Google
                          <Link
                            to={"https://policies.google.com/privacy"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Privacy Policy
                          </Link>{" "}
                          and
                          <Link
                            to={"https://policies.google.com/terms"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Terms of Service
                          </Link>{" "}
                          apply.
                        </p>
                      </div> */}
                      {/* -- /reCAPTCHA v3 */}
                    </div>
                    {(
                      watchEmailRegForm && watchPasswordRegForm) && (
                        <button className={styles.enter} type="submit">
                          <EnterIcon />
                        </button>
                      )}
                  </form>
                  // /Register form
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
