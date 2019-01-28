function Queue () {
    // Topic 集合
    var topics = {};
    
    // 保存待消费的 Topic，先发布后订阅
    var queue = {};
    
    function subscribe (topic, callback) {
        // 如果 Queue 中存在待消费的 Topic，先消费 Queue
        if (queue[topic]) {
            for (args of queue[topic]) {
                callback(...args);
            }
            
            // 全部消费完，清除 Queue 中的该 Topic
            delete queue[topic];
        }
        
        topics[topic] = callback;
    }
    
    function publish (topic, ...args) {
        if (topics[topic]) {
            topics[topic](...args);
        } else {
            queue[topic] || (queue[topic] = []);
            queue[topic].push(args);
        }
    }
    
    function unsubscribe (topic) {
        delete queue[topic];
        delete topics[topic];
    }
    
    return {
        publish,
        subscribe,
        unsubscribe
    }
}
