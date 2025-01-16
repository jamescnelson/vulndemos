import requests

url = "http://localhost:5000/execute"

p1 = {"cmd": "date"}

p2 = {"cmd": "date;locale"}

r = requests.get(url,params=p1)

if r.status == 200:
    print("req successful")
    print("Response: ", r.text)
else
    printf("Request failed, status: {r.status_code}")

r2 = requests.get(url,params=p2)
if r2.status == 200:
    print("req successful")
    print("Response: ", r2.text)
else
    printf("Request failed, status: {r2.status_code}")