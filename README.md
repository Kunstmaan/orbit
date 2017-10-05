# Orbit
## What
Speed up e-mail development with SCSS, integrated litmus testing, file hosting, translations and whatnot. Inspired by [foundation-emails-template](https://github.com/zurb/foundation-emails-template)
## Configure
Create a config.json file in the root of your project based on this template:
```json
{
    "projectName": "projectName",
    "ftp": {
        "host": "host.be",
        "user": "userName",
        "pass": "1234",
        "dest": "/path/on/server",
        "baseUrl": "http://host.be/projectName/"
    },
    "litmus": {
      "username": "test@test.be",
      "password": "1234",
      "url": "https://test.litmus.com",
      "applications": ["ol2003","ol2007","ol2010","ol2011","ol2013","chromegmailnew","chromeyahoo","appmail9","iphone5s","ipad","android4","androidgmailapp"]
    },
    "mail": {
      "to": [
        "example@domain.com"
      ],
      "from": "Company name <info@company.com",
      "smtp": {
        "auth": {
          "user": "example@domain.com",
          "pass": "12345678"
        },
        "host": "smtp.domain.com",
        "secureConnection": true,
        "port": 465
      }
    }
  }
```
## Available commands
```npm run start```
- Compiles SCSS
- Builds templates
- Minifies images
- Starts local development server
- Runs watchers on SCSS and templates
- Sets the image basepath to a local directory

```npm run build```
- Compiles SCSS
- Builds templates
- Inlines css in html
- Minifies images

By default the build task builds all translations, you can build a specific mail by running this task with a language flag, i.e.: ```npm run build -- --lang nl```

```npm run zip```
- Same as the build task but also creates a zip package of the html and images

```npm run test```
- Compiles SCSS
- Builds templates
- Minifies images
- Uploads images to specified ftp server
- Sets the image base path to the specified ftp server
- Sends a test of all mails to litmus

```npm run mail```
- builds the mail
- sends a test to a specified address in config.json

By default the mail task sends a test mail of all .html files in the dist folder, you can send a specific mail by running this task with a language flag, i.e.: ```npm run mail -- --lang nl```

## Layout
Orbit has the twigjs templating language built in, also the Inky templating language is available, more info: [here](https://foundation.zurb.com/emails/docs/inky.html)

## Contributing
We love contributions! You can take a look at our [Contribution Guide](docs/contributing.md) to get you started.
If you're submitting a pull request, please follow the guidelines in the [Submitting pull requests](docs/pull-requests.md)
documentation.
