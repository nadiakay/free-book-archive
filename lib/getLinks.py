import requests

import bs4

URL = 'https://en.wikisource.org/wiki/Ulysses_(1922)'

response = requests.get(URL)

soup = bs4.BeautifulSoup(response.text, 'html.parser')
links = soup.select('a')

for link in links:
  print(link.get_text())
  if link.get('href') != None:
    if 'https://' in link.get('href'):
      print(link.get('href'))
    else:
      print('https://en.wikipedia.org' + link.get('href'))
  print('------')  

    