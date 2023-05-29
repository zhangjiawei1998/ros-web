import React, { createContext, useState, ReactNode } from 'react'
import ROSLIB from 'roslib'
import { topic } from './type'

type Props = {
  children: ReactNode
}

type RosState = {
  ros: ROSLIB.Ros
  url: string
  isConnected: boolean,
  autoconnect: boolean,
  topics: topic[],
  subscribers: ROSLIB.Topic[]
}

const defaultRosState: RosState = {
  ros: new ROSLIB.Ros({}),
  url: 'ws://10.12.13.99:9090',
  isConnected: false,
  autoconnect: true,
  topics: [],
  subscribers: []
}

const ROSContext = createContext<
  [
    RosState,
    React.Dispatch<React.SetStateAction<RosState>>,
  ]
>(
  [
    defaultRosState,
    () => { }
  ]
)

const ROSProvider: React.FC<Props> = ({ children }) => {

  const [rosState, setRosState] = useState<RosState>(defaultRosState)

  return (
    <ROSContext.Provider value={[rosState, setRosState]}>
      {children}
    </ROSContext.Provider>
  )
}

export { ROSContext, ROSProvider }