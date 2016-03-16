import requests
import bs4

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