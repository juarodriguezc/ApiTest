import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseJsonPipe implements PipeTransform {
  transform(value: string): Record<string, unknown> {
    if (!value) return {};
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      throw new BadRequestException('Invalid JSON format');
    }
  }
}
