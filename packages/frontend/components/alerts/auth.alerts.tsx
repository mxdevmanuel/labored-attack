import { useState } from 'react';
import InfoIcon from '@components/icons/info';
import WarningIcon from '@components/icons/warning';
import ErrorIcon from '@components/icons/error';
import SuccessIcon from '@components/icons/success';
import clsx from 'clsx';
import values from 'lodash/values';

export interface AlertOptions {
  title: JSX.Element | string;
  icon?: JSX.Element;
  message: JSX.Element | string;
  buttonText?: string;
  buttonClasses?: string;
  onConfirm?: () => void;
}

type UseAlertReturnType = [typeof Alert[], (options: AlertOptions) => void];

export function useAlert(): UseAlertReturnType {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (options: AlertOptions) => {
    if (alerts.length === 0) {
      setAlerts([
        ...alerts,
        <Alert options={options} remove={() => setAlerts([])}></Alert>,
      ]);
    }
  };

  return [alerts, addAlert];
}

interface AlertProps {
  options: AlertOptions;
  remove: () => void;
}

const alertFieldsStyle = 'mx-auto my-2';
export function Alert({ options, remove }: AlertProps) {
  const [visible, setVisible] = useState(true);
  return (
    <div
      className={clsx('absolute h-screen w-screen z-50', {
        hidden: !visible,
      })}
      onClick={() => {
        setVisible(false);
        remove();
      }}
      style={{ backgroundColor: 'rgba(46,76,109, 0.7)' }}
    >
      <div className="rounded mx-auto transform translate-y-1/2 bg-white w-5/6 lg:w-1/3 p-6 transition-transform">
        <div className="flex flex-col place-content-center">
          <div className={alertFieldsStyle}>{options.icon}</div>
          <div className={alertFieldsStyle}>{options.title}</div>
          <div className={clsx(alertFieldsStyle, 'text-lg')}>
            {options.message}
          </div>
          <div className={alertFieldsStyle}>
            <button
              className={
                options.buttonClasses ??
                'px-5 py-2 bg-sky-700 text-white rounded-lg'
              }
              onClick={() => {
                if (options.onConfirm) {
                  options.onConfirm();
                  setVisible(false);
                  remove();
                }
              }}
            >
              {options.buttonText ?? 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const generateErrorAlert = (
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <ErrorIcon className="w-12 h-12 text-red-600" />,
  message,
  onConfirm,
  title: <span className="text-2xl text-red-600 text-bold">Error</span>,
});

export const generateInfoAlert = (
  title: string,
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <InfoIcon className="w-12 h-12 text-red-500" />,
  message,
  onConfirm,
  title: <span className="text-xl text-sky-600 text-bold">{title}</span>,
});

export const generateWarningAlert = (
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <WarningIcon className="w-12 h-12 text-yellow-500" />,
  message,
  onConfirm,
  title: <span className="text-xl text-orange-800 text-bold">Warning</span>,
});

export const generateSuccessAlert = (
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <SuccessIcon className="w-12 h-12 text-green-500" />,
  message,
  onConfirm,
  title: <span className="text-xl text-green-800 text-bold">Success</span>,
});

export const validationToMsg = (validation: Record<string, string[]>) =>
  values(validation)
    .map((val: string[]) => val.join(','))
    .join(', ');
