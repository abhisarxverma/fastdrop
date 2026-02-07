export type ServiceResponse<T> = {
  success: boolean
  message: string
  data: T | null
}
