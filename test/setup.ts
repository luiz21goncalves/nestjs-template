import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '@/app.module'

export async function createApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  return moduleFixture.createNestApplication()
}
