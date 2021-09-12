#Concert Controller
--

##Inspiration
-
As COVID continues to rage throughout the US, many of us have resorted to doing things virtually. One of those things are concerts, Concert Controller is an all in one solution to managing the backend live stream of music concerts!

##What it does
-
Concert Controller takes in an Nginx RTMP Stream allowing you to stream from almost any source and outputs a transcoded HLS stream for viewers. Concert Controllers handles everything between, after ingesting the RTMP feed it is transcoded and can be placed in a folder mounted in GCP Buckets building your own mini CDN allowing basically infinite low latency viewing.

##How I built it
-
Concontroller uses a very wide range of tools including the following: Nginx RTMP, Nginx, NodeJS, PM2, Golang, Docker and VueJS. The app can be broken down into two sections, the frontend app/API and the backend video handling. Golang does a lot of the heavy lifting by remotely configuring and creating RTMP on the fly by directly editing the config which the frontend interfaces with via a simple NodeJS/ExpressJS API.

##Accomplishments that I am proud of
-
The custom built CDN is something that I am really proud of as it can be a huge cost saving measure compared to traditional ‘scaling up’ methods. Rather than having to setup multiple servers and load balancing between them all you need is a single server to ingest and transcode then we can use GCP Buckets to deliver. It's a very basic idea but it was very difficult in practice as I ran into a lot of issues with the GCP Buckets caching the playlists while maintaining a relatively low latency of around ~20 seconds.

##What I learned
-
I learned a lot about HLS and LL-HLS, LL-HLS is a relatively new standard there aren’t many companies that use it yet since it recently has come out of beta and has been made a lot easier to interface with, but I ended up sticking with an HLS implementation since there were a lot more resources to learn from.

I also learned a lot about Docker and Docker-Images unintentionally I ended up needing to use them to containerize nginx instances in this project.

##Challenges I ran into
-
A major challenge I ran into was having to restart the nginx process after Go makes a config change such as adding/deleting a stream. Everytime you restart the process it ends up breaking and resetting any current live feeds that were taking place, in my initial testing I thought reloading it instead of restarting it wouldn’t break it but it ended up breaking it in anycase. In order to solve this for every stream I ended up having to create its own instance of nginx running in a docker container.

