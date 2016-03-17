import json

with open('./marchdata/Adams_march.txt', 'r') as loadfile:
    dataOne = json.load(loadfile)

with open('./aprildata/Adams_april.txt', 'r') as loadfile:
    dataTwo = json.load(loadfile)

print(dataOne)

def dropList(x):
	return ''.join(x)

k = sorted(dataTwo.items())
for x in k:
	head = x[0]
	body = x[1]
	d = {
		head: body
	}

	dataOne.update(d)

print(dataOne)
print(sorted(dataOne.items()))

