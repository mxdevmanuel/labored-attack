import { AlertOptions } from './base';
import InfoIcon from '@components/icons/info';
import WarningIcon from '@components/icons/warning';
import ErrorIcon from '@components/icons/error';
import SuccessIcon from '@components/icons/success';

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
