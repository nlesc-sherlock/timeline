# Run with docker
The timeline visualisation web app is available as docker container.
```sh
docker run -d -p 9000 nlesc/timeline
```

# Installing from github

## install nodejs
follow [those instructins](https://nodejs.org/en/download/package-manager/) appropriate for your operating system

## get timelines source code
```sh
git clone https://github.com/nlesc-sherlock/timeline.git
```

## install server side javascript dependencies with npm
```sh
npm install
```

## install bower globally (may require sudo, depending on your setup)
```sh
npm install --global bower
```

## install client side javascript dependencies with bower
```sh
bower install
```

## install gulp globally (may require sudo, depending on your setup)
```sh
npm install --global gulp
```

## build the project using gulp
```sh
gulp build
```

## run http server with the application
```sh
gulp serve
``` 
