import requests
import bs4
import threading
import json

# root = "http://www.accuweather.com/en/browse-locations/afr/zm"

# r = requests.get(root)
# # print(r.text)
# source = bs4.BeautifulSoup(r.content, "lxml")

# k = source.find("ul", {"class":"articles"})
# kk = []
# for link in k.findAll('a'):
#     # print(link.get('href'))
#     kk.append(link.get('href'))

# print(kk)

test = "http://www.accuweather.com/en/browse-locations/afr/zm/01"

r = requests.get(test)
source = bs4.BeautifulSoup(r.content, "lxml")
p = source.find("ul", {"class":"articles"})
pp = []
for link in p.findAll('a'):
	pp.append(link.get('href'))

print(pp)

