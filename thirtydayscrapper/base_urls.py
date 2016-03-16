import requests
import bs4
import threading
import json

root = "http://www.accuweather.com/en/browse-locations/afr/zm"

r = requests.get(root)
# print(r.text)
source = bs4.BeautifulSoup(r.content, "lxml")

k = source.find("ul", {"class":"articles"})
kk = []
for link in k.findAll('a'):
    # print(link.get('href'))
    kk.append(link.get('href'))

print(kk)

# test = "http://www.accuweather.com/en/browse-locations/afr/zm/01"
masterdict = {}
def allCode(link2):
	r = requests.get(link2)
	source = bs4.BeautifulSoup(r.content, "lxml")
	p = source.find("ul", {"class":"articles"})
	pp = []
	for link in p.findAll('a'):
		pp.append(link.get('href'))

	print(pp)


	for x in pp:
		code = x[(len(x)-6):]
		print(code)
		name = x[33:(len(x) - 31)]
		print(name)
		d = {
			name: {
				"id": code,
			}
		}
		masterdict.update(d)


for link1 in kk:
	allCode(link1)


with open('dict.txt', 'w') as outfile:
    json.dump(masterdict, outfile)