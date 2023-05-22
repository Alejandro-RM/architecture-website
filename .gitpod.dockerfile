FROM gitpod/workspace-base

RUN sudo apt-get update
RUN sudo apt-get upgrade -y
RUN sudo apt-get install -y curl

RUN sudo curl -sL -o- https://deb.nodesource.com/setup_18.x | bash
RUN sudo apt-get -y install nodejs

RUN sudo npm install -g npm yarn

RUN sudo apt-get clean && sudo rm -rf /var/cache/apt/*
RUN sudo rm -rf /var/lib/apt/lists/* && sudo rm -rf /tmp/*
