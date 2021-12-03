import { Transition } from '@headlessui/react';
import { useState } from 'react';
import values from 'lodash/values';
import clsx from 'clsx';

export interface AlertOptions {
  title: JSX.Element | string;
  icon?: JSX.Element;
  message: JSX.Element | string;
  buttonText?: string;
  buttonClasses?: string;
  onConfirm?: () => void;
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
  const [visible, setVisible] = useState(true);
  const close = () => {
    if (options.onConfirm) {
      options.onConfirm();
    }
    setVisible(false);
    remove();
  };
  return (
    <Transition appear={true} show={visible}>
      <div
        className="absolute h-screen w-screen z-50"
        onClick={close}
        style={{ backgroundColor: 'rgba(46,76,109, 0.7)' }}
      >
        <Transition.Child
          enter="transition-transform ease-linear duration-75"
          enterFrom="scale-75"
          enterTo="scale-100"
        >
          <div className="rounded-lg mx-auto translate-y-1/2 bg-white w-5/6 lg:w-1/3 p-6">
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
                  onClick={close}
                >
                  {options.buttonText ?? 'OK'}
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

export const validationToMsg = (validation: Record<string, string[]>) =>
  values(validation)
    .map((val: string[]) => val.join(', '))
    .join(', ');
