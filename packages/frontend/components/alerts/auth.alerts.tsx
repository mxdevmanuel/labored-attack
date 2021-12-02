import values from 'lodash/values';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);

export const registerSuccess = async (username: string) =>
  mySwal.fire({
    title: <span className="text-xl text-green-500">Success</span>,
    text: `You've registered succesfully as ${username}`,
    icon: 'success',
    customClass: {
      popup: 'bg-sky-900',
      confirmButton: 'bg-sky-600 text-white',
    },
  });
interface RegisterErrorCauses {
  validation?: Record<string, string[]>;
}

export const registerError = async (causes: RegisterErrorCauses) => {
  let message = 'Unexpected error';
  if (causes.validation) {
    message = values(causes.validation)
      .map((val: string[]) => val.join(','))
      .join(', ');
  }

  return mySwal.fire({
    title: <span className="text-xl text-green-500">Error</span>,
    text: message,
    icon: 'error',
    customClass: {
      popup: 'bg-sky-900',
      confirmButton: 'bg-sky-600 text-white',
    },
  });
};

export const loginError = async (causes: RegisterErrorCauses) => {
  let message = 'Unexpected error';
  if (causes.validation) {
    message = values(causes.validation)
      .map((val: string[]) => val.join(','))
      .join(', ');
  }

  return mySwal.fire({
    title: <span className="text-xl text-green-500">Error</span>,
    text: message,
    icon: 'error',
    customClass: {
      popup: 'bg-sky-900',
      confirmButton: 'bg-sky-600 text-white',
    },
  });
};
