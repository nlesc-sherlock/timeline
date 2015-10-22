# Run with docker
The timeline visualisation web app is available as docker container.
```sh
docker run -d -p 9000 nlesc/timeline
```

# Installing from github

## remove all files pertaining to old nodejs install
```
sudo apt-get purge nodejs
```

## change to temporary dir for the moment
```sh
cd ~/tmp
git clone https://github.com/nlesc-sherlock/timeline.git
```

## change into timeline dir
```sh
cd timeline
```

## add nodejs PPA
```sh
curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
```

## update the list of repositories:
```sh
sudo apt-get update

```

## now install from the new repository
```sh
sudo apt-get install --yes nodejs
```

## install node modules required by `timeline`
```sh
npm install
```

## install bower
```sh
sudo npm install --global bower
```

## let bower look in bower.json and retrieve and install any dependencies
```sh
bower install
```

## install gulp globally
```sh
sudo npm install --global gulp
```

## now you cna build the project with: `gulp`
```sh
gulp build
```

## you can let gulp serve the webapp on localhost with 
```sh
gulp serve
``` 
