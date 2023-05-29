import React from 'react'
import useRos from '../lib/useRos'


const Connection: React.FC = () => {
  
  const { rosState, rosManager } = useRos()

  return (
    <div>
      <input
        value={rosState.url}
        onChange={(e) => rosManager.changeUrl(e.target.value)}
      />
      <button onClick={rosManager.toggleConnection}>{rosState.isConnected ? 'Disconnect' : 'Connect'}</button>
      <p style={{ color: rosState.isConnected ? 'green' : 'red' }}>
        {rosState.isConnected ? 'Connected!' : 'Not Connected!'}
      </p>
    </div>
  )
}

export default Connection