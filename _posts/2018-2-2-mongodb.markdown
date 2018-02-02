---
layout: post
title:  "MongoDb  ReplSet"
date:   2016-8-10 18:8:01
categories: db
---

#### 1 when you use `replicalSet=new ReplSetTest({"nodes":3})` create mongodb test replset, may be encountered such a error:

    mongod errno:2 No such file or directory

reason is you not config log file path, you can create a config file in `/etc/mongo.config`




