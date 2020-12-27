#!/usr/bin/env bash

kubectl get svc

curl -H "Content-Type: application/json" -XGET http://localhost:30809/posts


curl -H "Content-Type: application/json" -XPOST http://localhost:30809/posts -d '{
  "title": "Post #1"
 }'

