import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    // 3단계에서 만든 심볼(DRIZZLE)을 이용해 DB 인스턴스를 주입받습니다.
    @Inject(DRIZZLE)
    private readonly db: NeonHttpDatabase<typeof schema>,
  ) { }

  async findUser(name: string) {
    // 실제 SQL의 Select-From-Where 구조와 완벽히 매칭됩니다.
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.name, name));

    return result[0];
  }
}
