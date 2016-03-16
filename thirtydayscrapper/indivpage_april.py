import requests
import bs4
import threading
import json

test = "http://www.accuweather.com/en/zm/livingstone/355959/april-weather/355959?monyr=4/1/2016&view=table"

r = requests.get(test)
# print(r.text)
source = bs4.BeautifulSoup(r.content, "lxml")

indivjson = {}
def dropList(x):
	return ''.join(x)

k = source.findAll("th", {"style": "background-color:#f6f7f8"})
# print(k)
count = 16
for x in k:
	count += 1
	z = x.contents
	str(z)
	z = z[len(z)-13:len(z)-4]
	z = dropList(z)

	gg = x.findNextSibling('td')
	ggg = gg.contents
	ggg = dropList(ggg)
	hi = ggg[:len(ggg)-1]

	pp = gg.findNextSibling('td')
	ppp = pp.contents
	ppp = dropList(ppp)
	lo = ppp[:len(ppp)-1]

	ww = pp.findNextSibling('td')
	www = ww.contents
	www = dropList(www)
	pre = www[:len(www)-1]


	# print(z)
	print('lol', hi)
	print(lo)
	print(pre)

	d = {
		count: {
			"lotemp": lo,
			"hitemp": hi,
			"pre" : pre,
		}
	}

	indivjson.update(d)

with open('livingstone_april.txt', 'w') as outfile:
    json.dump(indivjson, outfile)