import ROSLIB from "roslib";

export interface topic {
    name: string,
    msgType: string
}

export interface TopicConfig {
    ros: ROSLIB.Ros;
    name: string;
    messageType: string;
}


export interface RosMarker {
    action: 0 | 1 | 2 | 3,
    type: number,
    color: Record<'r' | 'g' | 'b' | 'a', number>,
    colors: any[],
    frame_locked: boolean,
    header: {
        frame_id: string,
        seq: number,
        stamp: {
            nsecs: number,
            secs: number
        }
    },
    lifetime: {
        nsecs: number,
        secs: number
    },
    ns: string,
    points: any[],
    pose: {
        orientation: Record<'x' | 'y' | 'z' | 'w', number>,
        position: Record<'x' | 'y' | 'z', number>,
    },
    scale: Record<'x' | 'y' | 'z', number>,
    text: string,
}