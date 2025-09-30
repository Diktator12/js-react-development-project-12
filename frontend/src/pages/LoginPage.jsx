import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { useFetchAuthMutation } from '../slices/authentication/authApi';
import { useTranslation } from 'react-i18next'
import { currentTokenSelector } from '../slices/authentication/authSlice';
import { useSelector } from 'react-redux';
import PAGEPATH from '../helpers/pagePath';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';

const LoginForm = () => {
  const inputRef = useRef()
  const { t } = useTranslation()
  const token = useSelector(currentTokenSelector)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [authFailed, setAuthFailed] = useState(null)
  const [fetchAuth] = useFetchAuthMutation()
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  useEffect(() => {
    if (token) {
      setAuthFailed(null)
      navigate(PAGEPATH.HOME)
    }
  }, [token, navigate])

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        setIsSubmitted(true)
        try {
          await fetchAuth(values).unwrap()
        } catch (e) {
          console.log(t('connectionError'))
          if (e.data.error === 'Unauthorized') {
            setAuthFailed(t('incorrectLoginInformation'))
          }
        }
        actions.setSubmitting(false)
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" 
          onSubmit={handleSubmit} 
          disabled={isSubmitting}>
          <h1 className="text-center mb-4">{t('enter')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              innerRef={inputRef}
              required
              placeholder={t('login')}
              id="loginUsername"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginUsername">{t('login')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
              type="password"
              id="loginPassword"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginPassword">{t('password')}</label>
            {authFailed && isSubmitted && <div className="invalid-tooltip alert-danger">{authFailed}</div>}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('enter')}</button>
        </Form>
      )}
    </Formik>
  )
}

const LoginCard = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100 ">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src='/images/tota.jpeg' className="rounded-circle img-fluid" alt="Войти" />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('noAccount')}
                </span>
                <a href={PAGEPATH.SIGNUP}>{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => (
  <>
    <TopNavigation />
    <LoginCard />
  </>
);

export default LoginPage;