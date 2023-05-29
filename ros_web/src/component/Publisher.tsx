import { useContext } from 'react';
import { useState } from 'react';
import ROSLIB from 'roslib';
import { useEffect } from 'react';
import { ROSContext } from '../lib/rosContext';

function Publisher() {

    const [rosState] = useContext(ROSContext)
    const [publisher, setPublisher] = useState<ROSLIB.Topic>()
    const [message, setMessage] = useState<string>()


    useEffect(() => {
        if (rosState.ros) {
            const topic = new ROSLIB.Topic({
                ros: rosState.ros,
                name: '/test',
                messageType: 'std_msgs/String'
            })
            setPublisher(topic)
        }
    }, [rosState])
    
    return (
        <div>

            <input type="text" onChange={(e) => {
                setMessage(e.target.value)
            }} />

            <button onClick={() => {
                const _message = new ROSLIB.Message({ data: message })
                publisher?.publish(_message)
            }}
            >
                publish "/hello" Toplic
            </button>

        </div >
    );
}

export default Publisher;
