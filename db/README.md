

flywayで接続できるようにする
$ docker-compose up postgres --build
postgres/data/pg_hba.confに以下を追記
```
host all all all trust
```