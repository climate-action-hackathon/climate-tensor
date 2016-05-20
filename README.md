# climate-tensor

### Mission Statement: Defined
Gives an organisation a sense of direction and defines what to be done for who and for what purpose

### Mission Statement:
Improve climate and weather information transfer to agricultural officers in order to improve farmers' decision making.

### TL:DR What we Built:

A dashboard that shows weather and farming related information for intermediary officers 

--------
### API Setup:

```
$git clone https://github.com/climate-action-hackathon/climate-tensor.git
$cd backend
$npm install
$node app.js
```

### Crawler:
```
cd thirtydayscrapper
python base_urls.py
python indivpage.py
```

### geolocation functionality: 
```
python -m http.server // py3
python -m SimpleHTTPServer // py2

--------
### TO-DO:

##### Frontend:
- Switch to proper build tool
- Proper routing: React router maybe?
- No SCSS file -> problem in the future?

##### Data:
- 7 day: Switch from enterprise API to Enact data
- Monthly: Really use Accuweather? Write proper scrapper if so.
- Seasonal: Convert IRI data into a format that can be fed into a database

##### Backend:
- Continuous integration, automated testing
- Code cleanup

##### Deployment:
- AWS free-tier instance?
- NGINX + PostgreSQL
- Automatic deployment onc commit

##### Project Management:
- Pivotal?
- Secure more team members?


--------
### Team Members
**Ideation**: Gladys Kitony, Madi Yahya

**Frontend**: Pooja Pasawala @poojawins, Daniel Mbeyah

**Backend**: David Yong @lacunadream
