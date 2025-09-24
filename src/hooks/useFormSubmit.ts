import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import type { FormData, ApiSuccessResponse, ApiErrorResponse, UseFormSubmitReturn } from '../types/form.types'

const API_URL = import.meta.env.VITE_API_URL

export default function useFormSubmit(): UseFormSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const submitForm = async (data: FormData): Promise<void> => {
    setIsSubmitting(true)
    setErrorMessage(null)
    setIsSuccess(false)

    try {
      const response = await axios.post<ApiSuccessResponse>(API_URL, data, {
        headers: { 'Content-Type': 'application/json' }
      })

      setIsSuccess(true)
      setSuccessMessage(response.data.message)
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>

      if (axiosError.response?.data) {
        const errorData = axiosError.response.data
        setErrorMessage(errorData.message || 'Something went wrong during submission. Please try again!')
      } else {
        setErrorMessage('Something went wrong during submission. Please try again!')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  return {
    submitForm,
    isSubmitting,
    isSuccess,
    errorMessage,
    successMessage,
    resetForm
  }
}