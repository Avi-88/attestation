import { type UUID } from "crypto";

export interface Space {
  id: UUID;
  user_id: UUID;
  name: string;
  header: string;
  logo_url?: string;
  message: string;
  created_at: Date;
  testimonial_ids?: UUID[];
  testimonial_config: JSON;
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

export interface SpaceBody {
  name: string;
  header: string;
  message: string;
  testimonial_config: object;
}
