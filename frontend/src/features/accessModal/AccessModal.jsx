import { Link } from "react-router-dom";
import styles from "./AccessModal.module.css";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { useForm } from "react-hook-form";
import {
  useTranslation,
  Trans
} from "react-i18next";
import { requestManager } from "../../requestManagement";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  EnterIcon,
  ClosedEyeSecondVersionIcon,
  EyeIconSecondVersionIcon
} from "../../components/SvgIcons";
import { setShowAccessModal } from "./accessModalSlice";
import { setSwitchAccessModal } from "./accessModalSlice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// -- Recaptcha v3
// import { useRecaptchaV3 } from "../../hooks/useRecaptchaV3";
// -- /Recaptcha v3
import { setlogInStatus } from "../access/logInStatusSlice";
export function AccessModal() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const queryClient = useQueryClient();
  // -- Recaptcha v3
  // const recaptchaV3PublicKey = import.meta.env.VITE_RECAPTCHA_V3_PUBLIC_KEY;
  // const recaptchaV3 = useRecaptchaV3(
  //   recaptchaV3PublicKey,
  //   "Registration"
  // );
  // -- /Recaptcha v3
  // yup validationSchema
  // Log In
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
  // /Log In
  // Registration
  const validationSchemaRegistration = Yup.object().shape({
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
  // /Registration
  // /yup validationSchema
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fadeOut, setFadeOut] = useState(false);
  const { showAccessModal, switchAccessModal } = useSelector((state) => state.accessModal);
  // Click tracking outside the modal
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
  // /Click tracking outside the modal
  // useForm logIn
  const {
    register: logIn,
    reset: logInFormReset,
    handleSubmit: handleSubmitLogIn,
    formState: { errors: errorsLogIn },
  } = useForm(
    {
      resolver: yupResolver(validationSchemaLogIn),
    },
    {
      mode: "onChange",
    }
  );
  // async function onSubmitLogIn(values) {
  const LogIn = useMutation({
    mutationKey: ["LogIn"],
    mutationFn: async (values) => {
      return requestManager.post("/login", values);
    },
    onSuccess: (data) => {
      dispatch(setShowAccessModal(false));
      dispatch(setlogInStatus(true));
      window.localStorage.setItem("logIn", true);
      window.localStorage.setItem(
        "authorizedUserData",
        JSON.stringify(data.data)
      );
      logInFormReset();
      queryClient.invalidateQueries({
        queryKey: ["Authorization"],
      });
    },
    onError: (error) => {
      setLogInServerErrors(error.response.data.error);
    },
  });
  const [logInServerErrors, setLogInServerErrors] = useState();
  const onSubmitLogIn = async (values) => {
    queryClient.invalidateQueries({
      queryKey: ["Authorization"],
    });
    LogIn.mutate(values);
  };
  // /useForm logIn
  // useForm Registration
  const {
    register: registration,
    reset: registrationFormReset,
    handleSubmit: handleSubmitRegistration,
    formState: { errors: errorsRegistration },
  } = useForm(
    {
      resolver: yupResolver(validationSchemaRegistration),
    },
    {
      mode: "onChange",
    }
  );
  const Registration = useMutation({
    mutationKey: ["Registration"],
    mutationFn: async (values) => {
      return requestManager.post("/registration", values);
    },
    onSuccess: (data) => {
      dispatch(setShowAccessModal(false));
      dispatch(setSwitchAccessModal(true));
      registrationFormReset();
      dispatch(setlogInStatus(true));
      window.localStorage.setItem("logIn", true);
      window.localStorage.setItem(
        "authorizedUserData",
        JSON.stringify(data.data)
      );
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Authorization"],
      });
    },
    onError: (error) => {
      setRegistrationServerErrors(error.response.data.error);
    },
  });
  const [registrationServerErrors, setRegistrationServerErrors] = useState();
  const onSubmitRegistration = async (values) => {
    // -- Recaptcha v3
    // const recaptchaV3Token = await recaptchaV3("Registration");
    // values["recaptchaV3Token"] = recaptchaV3Token;
    // -- /Recaptcha v3
    queryClient.invalidateQueries({
      queryKey: ["Authorization"],
    });
    Registration.mutate(values);
  };
  // /useForm Registration
  // hide body scroll when modal is open
  useEffect(() => {
    showAccessModal ?
      (document.body.style.overflow = "hidden")
      :
      (document.body.style.overflow = "auto");
  }, [showAccessModal]);
  // /hide body scroll when modal is open
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegistrationPassword, setShowRegistrationPassword] = useState(false);
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
                setRegistrationServerErrors("");
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
                  // LogIn form
                  <form onSubmit={handleSubmitLogIn(onSubmitLogIn)}>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='emailLogin'
                        label="email"
                        type="email"
                        placeholder="Email"
                        {...logIn("email")}
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
                          {...logIn("password")}
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
                    <button className={styles.enter} type="submit">
                      <EnterIcon />
                    </button>
                  </form>
                ) : (
                  // /LogIn form
                  // Registration form
                  <form onSubmit={handleSubmitRegistration(
                    onSubmitRegistration
                  )}
                  >
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='nameRegistration'
                        {...registration("name")}
                        label={t(
                          "AccessModal.InputNameSignUp"
                        )}
                        type="text"
                        placeholder={t(
                          "AccessModal.InputNameSignUp"
                        )}
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegistration.name && (
                          <p>{t(errorsRegistration.name.message)}</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='idRegistration'
                        {...registration("customId")}
                        label={"Id"}
                        type="text"
                        placeholder={"Id"}
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegistration.customId && (
                          <p>{t(errorsRegistration.customId.message)}</p>
                        )}
                      </div>
                      {registrationServerErrors ===
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
                        key='emailRegistration'
                        {...registration("email")}
                        label="* Email"
                        type="email"
                        placeholder="* Email"
                      />
                      <div className={styles.access_input_errors}>
                        {errorsRegistration.email && (
                          <p>{t(errorsRegistration.email.message)}</p>
                        )}
                      </div>
                      {registrationServerErrors ===
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
                          key='passwordRegistration'
                          {...registration("password")}
                          label={t(
                            "AccessModal.InputPasswordSignUp"
                          )}
                          type={showRegistrationPassword ? "text" : "password"}
                          placeholder={t(
                            "AccessModal.InputPasswordSignUp"
                          )}
                        />
                        <div
                          onClick={() => { setShowRegistrationPassword(!showRegistrationPassword) }}
                          className={styles.show_password}
                        >
                          {showRegistrationPassword ? <EyeIconSecondVersionIcon /> : <ClosedEyeSecondVersionIcon />}
                        </div>
                      </div>
                      <div className={styles.access_input_errors}>
                        {errorsRegistration.password && (
                          <p>{t(errorsRegistration.password.message)}</p>
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
                          {...registration("acceptTerms")}
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
                        {errorsRegistration.acceptTerms && (
                          <p>{t(errorsRegistration.acceptTerms.message)}</p>
                        )}
                      </div>
                      {/* -- Recaptcha v3 */}
                      <div className={styles.recaptcha_protected_message}>
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
                      </div>
                      {/* -- /Recaptcha v3 */}
                    </div>
                    <button className={styles.enter} type="submit">
                      <EnterIcon />
                    </button>
                  </form>
                  // /Registration form
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
