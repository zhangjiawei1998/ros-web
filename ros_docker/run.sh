source /opt/ros/melodic/setup.bash 
source ros_entrypoint.sh
# 创建工作目录
mkdir catkin_ws
cd catkin_ws
mkdir src
cd src

catkin_create_pkg using_markers roscpp visualization_msgs
mkdir using_markers/launch
cp /src/send_markers.launch /catkin_ws/src/using_markers/launch/send_markers.launch
cp /src/basic_shapes.cpp /catkin_ws/src/using_markers/src/basic_shapes.cpp
echo add_executable\(basic_shapes src/basic_shapes.cpp\) >> ./using_markers/CMakeLists.txt
echo target_link_libraries\(basic_shapes $\{catkin_LIBRARIES\}\) >> ./using_markers/CMakeLists.txt
cd ..
catkin_make
source devel/setup.bash
roslaunch using_markers send_markers.launch
