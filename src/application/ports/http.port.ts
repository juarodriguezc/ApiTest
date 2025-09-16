export abstract class HttpPort {
  abstract get<T extends object = Record<string, unknown>>(
    url: string,
    options?: Record<string, unknown>,
  ): Promise<T>;
}
