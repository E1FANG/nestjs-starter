import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(userId: string) {
    return `当前用户id:${userId}cc`;
  }
}
