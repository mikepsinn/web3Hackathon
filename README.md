## Setup 

1. Clone the repo
2. setup Git repo


#### Setup your git repo

```
git init
git add .
git commit -m "first commit"
git remote add origin git@github.com:<username>/<gitfilename>.git // this will be whatever your address will be
git push -u origin master
```

#### Setup the App

```npm install```

*DOTENV*

`touch .env`

add your variables in .env

```
DATABASE_URL=mongodb://localhost:27017/<DB name> //or remote DB URL
BUCKET_NAME=cloud Bucket name if using photos, i.e. AWS. 
SECRET=jkansdiubqfp9739f ****random seret for auth
```
