import json

with open('dict.txt', 'r') as loadfile:
    pagesData = json.load(loadfile)


holder = []

for x in pagesData:
	holder.append(x)

print(len(holder))