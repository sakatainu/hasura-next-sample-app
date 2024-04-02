### GUI

[table](https://hasura.io/docs/latest/schema/postgres/tables/)

#### ローカルで Hasura を起動する場合

通常の場合、docker で自動で起動する `http://localhost:8081/console` で DB 構造などを見れば良いが、  
Hasura Console を通して DB 構造や permission を変更する場合など、ローカルに自動的に反映したい場合は以下のようにする。

1. [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/) を導入する
2. `/packages/hasura/config.yaml` において、endpoint を `http://localhost:8081` に変更する
3. `/packages/hasura` において `$ hasura console` で起動する

### get

[query](https://hasura.io/docs/latest/queries/postgres/index/)

```graphql
{
  stockIssues {
    code
    name
    stockPrices {
      close
      volume
    }
  }
}
```

```bash
curl 'http://localhost:8081/v2/query' --data-raw '{"type":"insert","args":{"source":"default","table":{"name":"stockIssues","schema":"public"},"objects":[{"code":"0103","name":"hoge"}],"returning":["code","name"]}}'
```

### insert/update/delete/upsert

[mutation](https://hasura.io/docs/latest/mutations/postgres/index/)

```graphql
mutation insertData {
  insert_stockIssues(
    objects: [
      {
        code: "0123"
        name: "hoge corp"
        stockPrices: {
          data: [
            {
              date: "2022-01-01"
              open: 1
              high: 2
              low: 3
              close: 4
              volume: 5
            }
          ]
        }
      }
    ]
  ) {
    affected_rows
    returning {
      code
      name
      stockPrices {
        date
        open
        high
        low
        close
        volume
      }
    }
  }
}
```
