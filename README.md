# 简单的消息队列

- 先订阅、后发布，Pub / Sub 模式
- 先发布、后订阅，存在 Queue 中等待订阅时消费

``` javascript
var q = Queue();
q.publish('T1', 'Topic 1')
q.publish('T1', 'Topic 2')

q.subscribe('T1', function (data) {
    console.info(data)
})

// => Topic 1
// => Topic 2
```

``` javascript
var q = Queue();
q.subscribe('T2', function (data) {
    console.info(data)
})

q.publish('T2', 'Topic 3')
q.publish('T2', 'Topic 4')

// => Topic 3
// => Topic 4
```
