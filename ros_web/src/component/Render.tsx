import React from 'react';
import { Worldview, Axes, Cubes } from 'regl-worldview'
import { RosMarker } from '../lib/type';


export default function Render({ rosMarker }: { rosMarker: RosMarker }) {
  const n = 7;
  const points = [], colors = [];
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      for (let z = 0; z < n; z++) {
        points.push({ x: x / n * 10 - 5, y: y / n * 10 - 5, z: z / n * 10 - 5 });
        colors.push({ r: z / n, g: y / n, b: x / n, a: 0.8 });
      }
    }
  }
  
  const markers = [
    {
      pose: rosMarker.pose,
      scale: {
        x: rosMarker.scale.x *( rosMarker.type + 1),
        y: rosMarker.scale.y *( rosMarker.type + 1),
        z: rosMarker.scale.z *( rosMarker.type + 1),
      },
      color: rosMarker.color,
    },
  ];
  console.log('Render',markers)
  return (
    <Worldview
      defaultCameraState={{
        distance: 30,
        phi: Math.PI / 4,
        target: [0, 0, 0],
        targetOffset: [0, 0, 0],
        targetOrientation: [0, 0, 0, 1],
        thetaOffset: Math.PI / 4,
        perspective: true,
      }}>
      <Axes />
      <Cubes>{markers}</Cubes>
    </Worldview>
  );
}

