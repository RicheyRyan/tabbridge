# Tab Bridge

A tab explorer addon to help you explore and manage your browser tabs.

It is a [Svelte](https://svelte.dev/) app that is built with [Parcel](https://parceljs.org/).

# Running the code

A unix style system (OSX or Linux) is expected to run and build the code. It also expects Bash for the build commands.

The toolchain is expected to work with Node v12.4.0 and Yarn v1.16.0. It has not been tested with Npm.

Node can be downloaded from [here](https://nodejs.org/en/download/) and Yarn can be downloaded from [here](https://yarnpkg.com/lang/en/docs/install/#debian-)

First you must install the dependencies:

```
yarn
```

Then you can run the addon for development:

```
yarn start
```

This command will build the Svelte app and run the addon for development with web-ext.

# Build

The app can be built for submission:

```
yarn ext:build
```
