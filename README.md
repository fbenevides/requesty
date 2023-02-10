# requesty

Requesty is super tiny React Native mobile app that tests all available Pusher functionalities using the official SDK.

## Prerequisites

* Node v18.*
* Ruby 3.*
* CocoaPods

## Setup
```bash
$ gem install cocoapods
$ npm install
$ cd ios/
$ pod install
```

You also must rename `.env.example` to a `.env` with your own variables.

## Running
```bash
$ npm run ios # for ios
$ npm run android # for android
```

## Server
In order run the server, you need to install `docker` and `docker-compose`