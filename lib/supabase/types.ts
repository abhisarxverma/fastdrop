import { PostgrestError } from "@supabase/supabase-js";
import { ServiceResponse } from "../types/service-response";

export type RpcResult<T> = {
  data: T;
  error: PostgrestError | null;
};
 

export type ShareCreationRpcResult<T> = ServiceResponse<T>;