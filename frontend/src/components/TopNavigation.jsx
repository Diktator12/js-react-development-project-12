import { useTranslation } from 'react-i18next'
import { clearCredentials, currentTokenSelector } from '../slices/authentication/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const TopNavigation = () => {
  const { t } = useTranslation()
  const auth = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(clearCredentials());
    } catch (e) {
      console.log(t('registrationError'));
    }
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('chat')}</a>
        {auth && (
          <button onClick={handleLogout} type="button" className="btn btn-primary">{t('exit')}</button>
        )}
      </div>
    </nav>
  );
}

export default TopNavigation