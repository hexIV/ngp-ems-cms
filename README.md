# ngp-ems-cms

For Docker image, I have used the `tomsik68/xampp:latest` image. This comes with apache2, mysql and phpMyAdmin in built.
After all the changes I did to the image, I created an image myself that includes the DB structure and some sample data which can be accessed by pulling the following image:

```
docker pull hex4mt/ngp-ems
```

In order to run the Image, you will need to map a port for :80 (I used 8080) and you also need to mount the code.

Create a folder wherever you want on your machine (no restrictions on naming).
Clone each repository `ngp-ems-cms` and `ngp-ems-api` in the parent folder you created.
When running the Docker Image, under Volumes, select the parent folder as Host path while Container path put in `/www/`

Once you run the Docker image, you will be able to access the API and CMS on the following urls:

`https://localhost:<PORT>/www/ngp-ems-cms`
`https://localhost:<PORT>/www/ngp-ems-api`

The CMS project needs the following command to be running:

### Run Project

```sh
npm run dev
```