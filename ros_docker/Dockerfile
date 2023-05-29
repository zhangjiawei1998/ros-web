FROM osrf/ros:melodic-desktop-full

# 安装rosbridge
RUN sudo apt update 
RUN sudo apt-get install ros-melodic-rosbridge-server -y
# 复制文件
COPY ./basic_shapes.cpp ./src/basic_shapes.cpp
COPY ./send_markers.launch ./src/send_markers.launch
COPY ./run.sh ./run.sh

# 开启rosbridge服务
CMD /bin/bash run.sh

