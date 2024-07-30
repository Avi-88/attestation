import { type UUID } from "crypto";

export interface TestimonialConfig {
  header: string;
  message: string;
  logo_url?: string;
  includeTitleandCompany: boolean;
  includeRating: boolean;
  includeSocials: boolean;
  questions: string[];
}

export interface SuccessResponse {
  status: number;
  message?: string | "Success";
  extraData?: object;
}

export interface ErrorResponse {
  status: number;
  message?: string | "Something went wrong";
  extraData?: object;
}
