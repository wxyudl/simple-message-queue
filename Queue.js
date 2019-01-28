function Queue () {
    // Topic 集合
    let topics = {};
    
    // 保存待消费的 Topic，先发布后订阅
    let queue = {};
    
    let subscribe = (topic, callback) => {
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
    
    let publish = (topic, ...args) => {
        if (topics[topic]) {
            topics[topic](...args);
        } else {
            queue[topic] || (queue[topic] = []);
            queue[topic].push(args);
        }
    }
    
    let unsubscribe = (topic) => {
        delete queue[topic];
        delete topics[topic];
    }
    
    return {
        publish,
        subscribe,
        unsubscribe
    }
}

