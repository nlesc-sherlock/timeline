```
# remove all files pertaining to old nodejs install
sudo apt-get purge nodejs

# change to temporary dir for the moment
cd ~/tmp
git clone https://github.com/nlesc-sherlock/timeline.git

# change into timeline dir
cd timeline

# add nodejs PPA
curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -

# update the list of repositories:
sudo apt-get update

# now install from the new repository
sudo apt-get install --yes nodejs

# install node's own dependencies
sudo npm install

# install bower
sudo npm install --global bower

# let bower look in bower.json and retrieve and install any dependencies
bower install

# install gulp
sudo npm install --global gulp

# now you cna build the project with:
gulp
# which is short for:
gulp build

# you can let gulp serve the webapp on localhost with 
gulp serve

``` 



