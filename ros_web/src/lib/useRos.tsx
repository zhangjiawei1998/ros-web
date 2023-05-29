import { useContext, useEffect } from 'react'
import ROSLIB from 'roslib'
import { ROSContext } from './rosContext';
import { TopicConfig, topic } from './type';

// ROS Hook that lets others use ROS websocket connection
// returns some useful functions & values
export default function useRos() {
  const [rosState, setRosState] = useContext(ROSContext);

  useEffect(() => {
    if (!rosState.isConnected) {
      if (rosState.autoconnect) {
        console.log('autoconnecting');
        handleConnect();
      }
    }
  // eslint-disable-next-line
  }, [])

  function toggleConnection() {
    if (rosState.isConnected) {
      handleDisconnect();
    } else if (!rosState.isConnected) {
      handleConnect();
    }
  }

  function toggleAutoconnect() {
    if (rosState.autoconnect) {
      setRosState(ros => ({ ...ros, autoconnect: false }));
    } else if (!rosState.autoconnect) {
      setRosState(ros => ({ ...ros, autoconnect: true }));
    }
  }

  function changeUrl(new_url: string) {
    setRosState(ros => ({ ...ros, url: new_url }));
  }

  function _getTopics() {
    const topicsPromise: Promise<topic[]> = new Promise((resolve, reject) => {
      rosState.ros.getTopics(
        // success callback
        topics => {
          const topicList = topics.topics.map((topicName, i) => {
            return {
              name: topicName,
              msgType: topics.types[i],
            }
          });
          resolve(topicList);
        },
        // fail callback
        message => {
          console.error("Failed to get topic", message)
          reject(message);
        }
      )
    })

    topicsPromise.then(
      topics => setRosState(ros => ({ ...ros, topics: topics })),
      reason => setRosState(ros => ({ ...ros, topics: [] }))
    )
  }

  function subscribe(topicConfig: TopicConfig, callback: (message: ROSLIB.Message) => void) {
    // 新建Topic对象
    const topic = new ROSLIB.Topic(topicConfig)

    // 将处理程序放在dispatch里面是为了保证state是最新的
    setRosState(prev => {
      console.log(prev.subscribers, topic.name)

      if (prev.subscribers.some(subscribeTopic => subscribeTopic.name === topicConfig.name)) {
        console.log('话题 ' + topicConfig.name + ' 已经订阅')
        return prev
      }
      // 添加回调函数
      topic.subscribe(callback)
      // 添加到状态里
      return { ...prev, subscribers: [...prev.subscribers, topic] }
    })
  }


  const handleConnect = () => {
    try {
      rosState.ros.connect(rosState.url)
      rosState.ros.on('connection', () => {
        // console.log(connect)
        setRosState(ros => ({ ...ros, isConnected: true }));  // seems to take awhile for the roslibjs library to report connected
        _getTopics();
      })
      rosState.ros.on('error', (error) => {  //gets a little annoying on the console, but probably ok for now
        console.log(error);
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleDisconnect = () => {
    try {
      rosState.ros.close();
      setRosState(ros => ({ ...ros, isConnected: false, topics: [] }));
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //   console.log(rosState)
  // }, [JSON.stringify(rosState)])

  return {
    rosState,
    rosManager: {
      toggleConnection,
      changeUrl,
      toggleAutoconnect,
      subscribe
    }
  }
}
