import { useState } from 'react';
import values from 'lodash/values';
import clsx from 'clsx';

export interface AlertOptions {
  title: JSX.Element | string;
  icon?: JSX.Element;
  message: JSX.Element | string;
  buttonText?: string;
  buttonClasses?: string;
  containerClasses?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertProps {
  options: AlertOptions;
  remove: () => void;
}

type UseAlertReturnType = [typeof Alert[], (options: AlertOptions) => void];

export function useAlert(): UseAlertReturnType {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (options: AlertOptions) => {
    if (alerts.length === 0) {
      setAlerts([
        <Alert
          key={'uniquealert'}
          options={options}
          remove={() => setAlerts([])}
        ></Alert>,
      ]);
    }
  };

  return [alerts, addAlert];
}

/* Spacing between alert fields */
const alertFieldsStyle = 'mx-auto my-2 text-center';

export function Alert({ options, remove }: AlertProps) {
  return (
    <div
      className="absolute h-screen w-screen z-50"
      onClick={() => {
        if (options.onCancel) {
          options.onCancel();
        } else if (options.onConfirm) {
          options.onConfirm();
        }
        remove();
      }}
      style={{ backgroundColor: 'rgba(46,76,109, 0.7)' }}
    >
      <div
        className={clsx(
          options.containerClasses ?? 'animate__animated animate__bounceIn',
          ' rounded-lg mx-auto my-20 bg-white w-5/6 lg:w-1/3 p-6',
        )}
      >
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
                if (options.onConfirm) options.onConfirm();
                remove();
              }}
            >
              {options.buttonText ?? 'OK'}
            </button>
            <button
              className={clsx(
                'mx-2 px-5 py-2 bg-red-700 text-white rounded-lg',
                {
                  hidden: !options.onCancel,
                },
              )}
              onClick={() => {
                if (options.onCancel) options.onCancel();
                remove();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const validationToMsg = (validation: Record<string, string[]>) =>
  values(validation)
    .map((val: string[]) => val.join(', '))
    .join(', ');
