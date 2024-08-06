/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    message: string;
    success: boolean;
    stack: string;
  };
  status: number;
};

export type TResponse = {
  data?: any;
  error?: TError;
};
