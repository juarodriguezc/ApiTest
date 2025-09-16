import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
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
      throw new Error(`HTTP GET failed: ${(error as Error).message}`);
    }
  }
}
