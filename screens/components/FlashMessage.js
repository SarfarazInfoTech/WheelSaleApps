import {showMessage, hideMessage} from 'react-native-flash-message';

const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
  });
};

const showSuccess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

const showWarning = message => {
  showMessage({
    type: 'warning',
    icon: 'warning',
    message,
  });
};

const showInfo = message => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
};

const showDefault = message => {
  showMessage({
    type: 'default',
    icon: 'default',
    message,
  });
};

const showNone = message => {
  showMessage({
    type: 'none',
    icon: 'none',
    message,
  });
};
export {showSuccess, showError, showWarning, showInfo, showDefault, showNone};
