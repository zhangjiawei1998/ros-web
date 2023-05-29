import { useEffect, useState } from 'react'
import ROSLIB from 'roslib'
import useRos from '../lib/useRos'
import Render from './Render'

function Subscriber() {

  const [message, setMessage] = useState<ROSLIB.Message | null>(null)
  const { rosState, rosManager } = useRos()


  useEffect(() => {
    if (rosState.ros) {
      rosManager.subscribe({
        ros: rosState.ros,
        name: '/visualization_marker',
        messageType: 'visualization_msgs/Marker'
      },
        message => {
          // console.log('Receive message from Ros: ', message)
          setMessage(message)
        })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      Receive message from '/hello' Topic:
      {/* {
        messageList.map((message, i) =>
          <div key={i} style={{ width: '50vw', height: '50vh' }}>
            <Render rosMarker={message as any}/>
          </div>
        )
      } */}
      {
        message &&
        <div style={{ width: '50vw', height: '50vh' }}>
          <Render rosMarker={message as any} />
        </div>
      }

    </div>
  )
}

export default Subscriber
