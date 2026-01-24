# NestJS with MikroORM
이 프로젝트는 MikroORM의 핵심 철학인 **Unit of Work** 패턴과 **Identity Map**을 이해하고, 기본적인 CRUD를 구현하는 것을 목표로 합니다.

## 🎯 Learning Roadmap

### Phase 1: 환경 설정 및 기본 연결
- [x] **Project Setup**: NestJS + MikroORM + PostgreSQL 패키지 설치
- [x] **Configuration**: `mikro-orm.config.ts` 설정 및 `MikroOrmModule` 연동
- [ ] **Database Connection**: Docker로 PG 띄우고 접속 확인

### Phase 2: 엔티티 설계 (TypeORM vs MikroORM)
- [ ] **BaseEntity**: 모든 테이블 공통 필드(`id`, `createdAt`, `updatedAt`) 추상화
- [ ] **Entity Definition**: `User` 엔티티 작성 (Decorator 방식 이해하기)
- [ ] **MikroORM CLI**: CLI 설정 및 스키마 확인

### Phase 3: 핵심 개념 및 CRUD (The "Unit of Work")
- [ ] **Create**: `persist` vs `persistAndFlush` 의 차이 이해하기
- [ ] **Read**: `findOne`, `find` 및 필터링 옵션 사용해보기
- [ ] **Update**: `assign` 헬퍼 메서드와 **변경 감지(Dirty Checking)** 흐름 이해하기 (명시적 `save` 없이 업데이트)
- [ ] **Delete**: `removeAndFlush` 사용해보기
- [ ] **Repository vs EntityManager**: 도메인 로직에서 어떤 방식을 사용할지 결정하고 적용하기

### Phase 4: 관계 매핑 (Relations)
- [ ] **1:N Relation**: `User`와 `Post` 관계 설정 (`Collection` 래퍼 객체 이해하기)
- [ ] **Eager vs Lazy Loading**: `populate` 옵션을 통해 N+1 문제 해결해보기
- [ ] **Reference**: `Reference<T>` 타입을 사용하여 외래키 다루기

### Phase 5: 마이그레이션 및 심화
- [ ] **Migration**: `Migration` 파일 생성 및 DB 동기화 (Prisma `migrate`와 비교)
- [ ] **Transaction**: `em.transactional()`을 이용한 안전한 트랜잭션 처리
- [ ] **Validation**: `class-validator`와 연동하여 DTO 검증

## 🛠 Tech Stack
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: MikroORM v6