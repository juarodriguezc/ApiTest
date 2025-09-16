import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpPort } from '@src/application/ports/http.port';

@Injectable()
export class AxiosHttpAdapter implements HttpPort {
  async get<T extends object = Record<string, unknown>>(
    url: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      ...options,
    };
    try {
      const response = await axios.get<T>(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status ?? 500;
        const message = axiosError.message || 'External API call failed';
        throw new HttpException(message, status);
      }
      throw new HttpException(
        `HTTP GET failed: ${(error as Error).message}`,
        500,
      );
    }
  }
}
