###

### Setup
```
  export AWS_ACCESS_KEY_ID=<key>
  export AWS_SECRET_ACCESS_KEY=<key>
  export AWS_DEFAULT_REGION=<region>

  npm install
  serverless deploy 
 ``` 
###  For Database configuration
    - Edit your database credentials in `serverless.yml`
    - Make sure the database is created and has public access with a proper Security Group if you are using AWS RDS.

#### 
# To Run locally

This example demonstrates how to run a serverless locally for testing purpose

```
  npm install
```

Add New Lead with his interest.
  Command:
     `serverless invoke local --function leads-create --path src/data-mocks/create.json `

Lising leads with (Pagination, ordering) functionality.
  Command:
    `serverless invoke local --function leads-list --path src/data-mocks/list.json `