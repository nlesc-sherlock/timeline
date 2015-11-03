# Run with docker
The timeline visualisation web app is available as docker container.
```sh
docker run -d -p 9000 nlesc/timeline
```

# Installing from github

1. install nodejs:
  
  * follow [those instructins](https://nodejs.org/en/download/package-manager/) (choose appropriate for your operating system)

2. get timelines source code
  ```sh
  git clone https://github.com/nlesc-sherlock/timeline.git
  ```
3. install server side javascript dependencies with npm
  ```sh
  npm install
  ```

4. install bower globally (may require sudo, depending on your setup)
  ```sh
  npm install --global bower
  ```

5. install client side javascript dependencies with bower
  ```sh
  bower install
  ```

6. install gulp globally (may require sudo, depending on your setup)
  ```sh
  npm install --global gulp
  ```

7. build the project using gulp
  ```sh
  gulp build
  ```

8. run http server with the application
  ```sh
  gulp serve
  ``` 
