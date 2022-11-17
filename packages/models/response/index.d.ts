export type Response<TData = any, TError = any> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: TError;
    };
