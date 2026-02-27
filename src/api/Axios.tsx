import axios from 'axios';
import { getApiUrl } from '../env.js';

export default axios.create({
    baseURL: getApiUrl()
});

export function getErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? "Unknown error";
  } else if (err instanceof Error) {
    return err?.message ?? "Unknown error";
  } else {
    return "Unknown error";
  }
}