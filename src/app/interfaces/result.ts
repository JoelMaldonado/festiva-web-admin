export interface Result<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
