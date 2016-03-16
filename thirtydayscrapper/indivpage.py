import requests
import bs4
import threading
import json

test = "http://www.accuweather.com/en/zm/adonsi/819368/march-weather/819368?monyr=3/1/2016&view=table"

r = requests.get(test)
# print(r.text)
source = bs4.BeautifulSoup(r.content, "lxml")

# k = source.findAll("td")

# indivjson = {}

# for lol in k:
# 	temp = lol.find("span", {"class":"temp"})
# 	lo = lol.find("span", {"class":"lo"})
# 	# print(temp.contents[0])
# 	# print(high.contents[0])

# 	d = {
# 		"name": {
# 			"temp": temp,
# 			"high": lo,

# 		}
# 	}
def dropList(x):
	return ''.join(x)

k = source.findAll("th", {"style": "background-color:#f6f7f8"})
# print(k)
for x in k:
	# z = x.contents
	# # z = dropList(z)
	# z = z[len(z)-13:len(z)-4]

	gg = x.findNextSibling('td')
	ggg = gg.contents
	ggg = dropList(ggg)
	hi = ggg[:len(ggg)-1]

	pp = gg.findNextSibling('td')
	ppp = pp.contents
	ppp = dropList(ppp)
	lo = ggg[:len(ggg)-1]

	ww = pp.findNextSibling('td')
	www = ww.contents
	www = dropList(www)
	pre = www[:len(www)-1]


	# print(z)
	print('lol', hi)
	print(lo)
	print(pre)

	
# indivjson = {}

# for lol in k:
# 	temp = lol.find("span", {"class":"temp"})
# 	lo = lol.find("span", {"class":"lo"})
# 	# print(temp.contents[0])
# 	# print(high.contents[0])

# 	d = {
# 		"name": {
# 			"temp": temp,
# 			"high": lo,

# 		}
# 	}
# print(k)