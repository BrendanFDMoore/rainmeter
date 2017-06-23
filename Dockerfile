FROM node:6.9.5

# Change working directory, where your app lives
WORKDIR /var/app

# Install yarn from the local .tgz
RUN mkdir -p /opt
# Unpack Yarn tarball to /opt
ADD latest.tar.gz /opt/
# Move yarn bin to /opt
RUN mv /opt/dist /opt/yarn
# Add Yarn to PATH
ENV PATH "$PATH:/opt/yarn/bin"

# Install packages using Yarn in a temp dir
ADD package.json yarn.lock /tmp/
# Must run `yarn` in same line as `cd` because cwd seems to reset
RUN cd /tmp && yarn
# copy the resulting node_modules to app dir (after creating it)
RUN mkdir -p /var/app && cd /var/app && ls -a && ln -s /tmp/node_modules

# Copy source code to app dir
COPY . /var/app

# Build application
# RUN cd /var/app && ls -a && yarn build

EXPOSE 3000

CMD ["yarn","start"]
