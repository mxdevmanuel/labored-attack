import { AlertOptions } from './base';
import InfoIcon from '@components/icons/info';
import WarningIcon from '@components/icons/warning';
import ErrorIcon from '@components/icons/error';
import SuccessIcon from '@components/icons/success';

export const generateErrorAlert = (
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <ErrorIcon className="w-16 h-16 text-red-600" />,
  message,
  onConfirm,
  containerClasses: 'animate__animated animate__wobble animate__faster',
  title: <span className="text-2xl text-red-600 text-bold">Error</span>,
});

export const generateInfoAlert = (
  title: string,
  message: JSX.Element | string,
  options?: {
    onConfirm?: () => void;
    onCancel?: () => void;
  },
): AlertOptions => ({
  icon: <InfoIcon className="w-16 h-16 text-red-500" />,
  message,
  onConfirm: options?.onConfirm,
  onCancel: options?.onCancel,
  title: <span className="text-xl text-sky-600 text-bold">{title}</span>,
});

export const generateWarningAlert = (
  message: JSX.Element | string,
  options?: {
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    confirmClasses?: string;
  },
): AlertOptions => ({
  icon: <WarningIcon className="w-16 h-16 text-yellow-500" />,
  message,
  onConfirm: options?.onConfirm,
  onCancel: options?.onCancel,
  title: <span className="text-xl text-orange-800 text-bold">Warning</span>,
  buttonText: options?.confirmText,
  buttonClasses: options?.confirmClasses,
  containerClasses: 'animate__animated animate__jello',
});

export const generateSuccessAlert = (
  message: JSX.Element | string,
  onConfirm?: () => void,
): AlertOptions => ({
  icon: <SuccessIcon className="w-16 h-16 text-green-500" />,
  message,
  onConfirm,
  title: <span className="text-xl text-green-800 text-bold">Success</span>,
});
