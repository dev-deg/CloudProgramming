# Programming For The Cloud

## Google Cloud Pins

- Compute Engine [VM Instances]
- Billing
- Cloud Storage [ Browser ]
- Firestore [ Data ]
- Memorystore [ Redis ]
- Security [Secret Manager ]
- APIs & Services [ Credentials ]
- Network services [ Cloud DNS ]

## Domain & SSL (Namecheap)

Generating certificate signing request (CSR)

```bash
npm install openssl
openssl req -nodes -newkey rsa:2048 -keyout pk.key -out cert-req.csr
```

## Project Setup

1. Download and install VSCode
2. Download and install Git
3. Download and install Node.js
4. Setup a private git Repository

## GIT

### GitIgnore Setup

Create file .gitignore and put the following:

```bash
/frontend/node_modules
/backend/node_modules
/backend/key.json
.DS_Store
```

### Git Repo

```bash
git init
git remote add origin [YOUR GIT URL]
git add *
git commit -a -m "init repo"
git push -u origin main
```

### Saving On Git

```bash
git add *
git commit -a -m "[UPDATE INFO]"
git push
```

## Backend Setup

### Setting up NPM

```bash
cd frontend
npm init -y
cd ..
cd backend
npm init -y
```

### Installing Backend Packages

```bash
cd backend
npm i express
npm i cors
npm i @google-cloud/firestore
npm i @google-cloud/secret-manager
```

## Deployment

### SERVER CONFIG

```bash
sudo apt-get update
sudo apt-get upgrade -y
curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
sudo npm i -g nodemon
sudo npm i -g pm2
```

### Running Backend

```bash
git clone repo
cd repo/backend
pm2 start index.js
```

### PM2 Commands

```bash
pm2 list
pm2 start
pm2 stop     <app_name|namespace|id|'all'|json_conf>
pm2 restart  <app_name|namespace|id|'all'|json_conf>
pm2 delete   <app_name|namespace|id|'all'|json_conf>
```

More info here: https://www.npmjs.com/package/pm2
