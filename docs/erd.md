# ER図
```mermaid
erDiagram
    Users {
        uuid id PK
        timestamp created_at
        timestamp updated_at
    }

    Schedules {
        uuid id PK
        uuid user_id FK
        text title
        text memo
        timestamp start_time
        timestamp end_time
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }

    Tasks {
        uuid id PK
        uuid user_id FK
        text title
        text memo
        timestamp start_time
        timestamp end_time
        integer estimated_minutes
        text status
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }

    Users ||--o{ Schedules : "has"
    Users ||--o{ Tasks : "has"
```

## 補足

### 制約

**Users**
- id: PRIMARY KEY

**Schedules**
- id: PRIMARY KEY
- user_id: FOREIGN KEY（Usersを参照、CASCADE DELETE）
- title: NOT NULL
- start_time: NOT NULL
- end_time: NOT NULL
- memo: NULL許容
- deleted_at: NULL許容

**Tasks**
- id: PRIMARY KEY
- user_id: FOREIGN KEY（Usersを参照、CASCADE DELETE）
- title: NOT NULL
- start_time: NOT NULL
- end_time: NOT NULL
- estimated_minutes: NOT NULL
- status: NOT NULL、text（INBOX / SCHEDULED / COMPLETED）、デフォルト値はINBOX
- memo: NULL許容
- deleted_at: NULL許容