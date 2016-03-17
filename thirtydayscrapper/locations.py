import requests
import bs4
import threading
import json

with open('dict.txt', 'r') as loadfile:
    pagesData = json.load(loadfile)


locations = []

f = open('locations.txt', 'w')
for x in pagesData:
	f.write("%s\n" % x)
f.close()