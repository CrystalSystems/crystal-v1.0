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
// -- reCAPTCHA v3
// import { useRecaptchaV3 } from "../../hooks/useRecaptchaV3";
// import { RECAPTCHA_V3_PUBLIC_KEY } from "../../constants/index.js";
// -- /reCAPTCHA v3
import { setlogInStatus } from "../access/logInStatusSlice";

export function AccessModal() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const queryClient = useQueryClient();

  // -- reCAPTCHA v3
  // const recaptchaV3 = useRecaptchaV3(
  //   RECAPTCHA_V3_PUBLIC_KEY,
  //   "registration"
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

  // registration validation
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
  // /registration validation

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
    register: useFormLogin,
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

  // log in
  const logIn = useMutation({
    mutationKey: ['logIn'],
    mutationFn: async (values) => {
      return requestManager.post("/user/login", values);
    },

    onSuccess: () => {
      dispatch(setShowAccessModal(false));
      dispatch(setlogInStatus(true));
      window.localStorage.setItem('logIn', true);
      logInFormReset();
      queryClient.invalidateQueries({
        queryKey: ['authorization'],
      });
    },

    onError: (response) => {
      setLogInServerErrors(response.error);
    },

  });
  // /log in

  const [logInServerErrors, setLogInServerErrors] = useState();

  const onSubmitLogIn = async (values) => {
    queryClient.invalidateQueries({
      queryKey: ['authorization'],
    });
    logIn.mutate(values);
  };
  // /useForm log in

  // useForm registration
  const {
    register: useFormRegistration,
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

  // registration
  const registration = useMutation({
    mutationKey: ["registration"],
    mutationFn: async (values) => {
      return requestManager.post("/user/registration", values);
    },

    onSuccess: () => {
      dispatch(setShowAccessModal(false));
      dispatch(setSwitchAccessModal(true));
      registrationFormReset();
      dispatch(setlogInStatus(true));
      window.localStorage.setItem('logIn', true);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['authorization'],
      });
    },

    onError: (response) => {
      setRegistrationServerErrors(response.error);
    },

  });
  // /registration

  const [registrationServerErrors, setRegistrationServerErrors] = useState();

  const onSubmitRegistration = async (values) => {
    // -- reCAPTCHA v3
    // const recaptchaV3Token = await recaptchaV3("registration");
    // values["recaptchaV3Token"] = recaptchaV3Token;
    // -- /reCAPTCHA v3
    queryClient.invalidateQueries({
      queryKey: ['authorization'],
    });
    registration.mutate(values);
  };
  // /useForm registration

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
                  // logIn form
                  <form onSubmit={handleSubmitLogIn(onSubmitLogIn)}>
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='emailLogin'
                        label="email"
                        type="email"
                        placeholder="Email"
                        {...useFormLogin("email")}
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
                          {...useFormLogin("password")}
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
                  // /logIn form
                  // Registration form
                  <form onSubmit={handleSubmitRegistration(
                    onSubmitRegistration
                  )}
                  >
                    <div className={styles.access_input_errors_wrap}>
                      <input
                        key='nameRegistration'
                        {...useFormRegistration("name")}
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
                        {...useFormRegistration("customId")}
                        label="Id"
                        type="text"
                        placeholder="Id"
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
                        {...useFormRegistration("email")}
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
                          {...useFormRegistration("password")}
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
                          {...useFormRegistration("acceptTerms")}
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
