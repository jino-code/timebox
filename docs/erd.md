# ER図
```mermaid
erDiagram
    users {
        uuid id PK
        timestamptz created_at
        timestamptz updated_at
    }

    schedules {
        uuid id PK
        uuid user_id FK
        text title
        text memo
        timestamptz start_time
        timestamptz end_time
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    tasks {
        uuid id PK
        uuid user_id FK
        text title
        text memo
        timestamptz start_time
        timestamptz end_time
        integer estimated_minutes
        text status
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    users ||--o{ schedules : "has"
    users ||--o{ tasks : "has"
```

## 補足

### 制約

**Users**
- id: PRIMARY KEY
- created_at: NOT NULL
- updated_at: NULL許容

**Schedules**
- id: PRIMARY KEY
- user_id: FOREIGN KEY（Usersを参照、CASCADE DELETE）
- title: NOT NULL
- start_time: NOT NULL
- end_time: NOT NULL
- memo: NULL許容
- created_at: NOT NULL
- updated_at: NULL許容
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
- created_at: NOT NULL
- updated_at: NULL許容
- deleted_at: NULL許容