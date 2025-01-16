import requests

url = "http://localhost:3000/update-email"

params = {
    "email": "me@good.com"
}

poc = {
    "email": "me@bad.com"
}


###################################################
# HOW TO USE requests.get(...)
# https://docs.python-requests.org/en/latest/user/quickstart/#make-a-request
#
# payload = {'key1': 'value1', 'key2': 'value2'}
# r = requests.get('https://httpbin.org/get', params=payload)
# You can see that the URL has been correctly encoded by printing the URL:
#
# print(r.url)
# https://httpbin.org/get?key2=value2&key1=value1
#
# Note that any dictionary key whose value is None will not be added to the URL’s query string.
#
#You can also pass a list of items as a value:
#
# payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
#
# r = requests.get('https://httpbin.org/get', params=payload)
# print(r.url)
###################################################

## send get req w/ query param:
#response = requests.get(url, params=params)
#
## check if successful:
#if response.status_code==200:
#    print("Req success!")
#    print("Response data: ", response.text)
#else:
#    print(f"Request failed with status code {response.status_code}")
#
r2 = requests.get(url, params=poc)

# check if sucessful:
if r2.status_code==200:
    print("req success!")
    print("Response data: ", r2.text)
else:
    print(f"Req faield w/ status {r2.status_code}")
