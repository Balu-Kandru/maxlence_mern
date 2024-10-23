// helpers/errorHandler.ts
import { AxiosError } from 'axios';

interface ErrorResponseData {
  message?: string;
  [key: string]: any;
}

export const handleApiError = (error: AxiosError<ErrorResponseData>): void => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        alert('You are not authorized to perform this action.');
        break;
      case 404:
        alert('Requested resource not found.');
        break;
      case 500:
        alert(`Error: ${data?.message || 'Something went wrong!'}`);
        break;
      default:
        alert(`Error: ${data?.message || 'Something went wrong!'}`);
        break;
    }
  } else if (error.request) {
    alert('Network error. Please check your internet connection.');
  } else {
    alert(`Error: ${error.message}`);
  }
};
