export interface FormData {
  message: string;
}

export interface ApiSuccessResponse {
  message: string;
}

export interface ApiErrorResponse {
  message?: string;
  nonFieldErrors?: string; // might be sent if the word 'error' is the message
}

export interface UseFormSubmitReturn {
  submitForm: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  resetForm: () => void;
}
