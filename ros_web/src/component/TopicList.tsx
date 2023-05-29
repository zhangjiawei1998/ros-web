import React from 'react'
import useRos from '../lib/useRos'

function TopicList() {

  const { rosState } = useRos()

  return (
    <table>
      <tr>
        <th>path</th>
        <th>msgType</th>
        <th>subscribe</th>
      </tr>
      {
        rosState.topics.map((topic, i) => {
          return (
            <tr key={i}>
              <td>{topic.name}</td>
              <td>{topic.msgType}</td>
              <td>{rosState.subscribers.some(subscriber => subscriber.name === topic.name)? 'true' : 'false'}</td>
            </tr>
          )
        })
      }
    </table>
  )
}

export default TopicList
