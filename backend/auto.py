from numpy import average
import requests
from bs4 import BeautifulSoup
import pandas as pd
# #CORE DATA SCRAPING
# URL = "http://portal.core.edu.au/conf-ranks/?search=&by=rank&source=CORE2021&sort=arank&page=1"
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, "html.parser")
# page_list = [1]
# source = ["CORE2021","CORE2020","CORE2018","CORE2017","CORE2014","CORE2013","CORE2008"]
# for tag in soup.find_all('a'):
#     if(tag.text.isdigit()):
#         page_list.append(tag.text)
# titles = []
# for tag in soup.find_all('th'):
#     titles.append(tag.text.strip())
# titles.append('href')
# df_coreA_s = pd.DataFrame(columns=titles)
# df_coreA = pd.DataFrame(columns=titles)
# df_coreB = pd.DataFrame(columns=titles)
# table = soup.find_all('table')

# const_url="http://portal.core.edu.au/conf-ranks/?search=&by=rank&source="
# const_url_2 = "&sort=arank&page="
# for s in source:
#     flag=0  
#     for p in page_list:
#         URL = const_url+s+const_url_2+str(p)
#         page = requests.get(URL)
#         soup = BeautifulSoup(page.content, "html.parser")
#         table = soup.find_all('table')
#         for row in table[0].find_all('tr'):  
#             # Find all data for each column
#             columns = row.find_all('td')
#             if(columns != []):
#                 title = columns[0].text.strip()
#                 acronym = columns[1].text.strip()
#                 source = columns[2].text.strip()
#                 rank = columns[3].text.strip()
#                 dblp = columns[4].text.strip()
#                 if dblp!="none":
#                     href = columns[4].find('a', href=True)['href']
#                 else:
#                     href = "No"
#                 has_data = columns[5].text.strip()
#                 primary_for = columns[6].text.strip()
#                 comments = columns[7].text.strip()
#                 average_rating = columns[8].text.strip()
#                 if(rank=="A*"):
#                     df_coreA_s = df_coreA_s.append({'Title':title,'Acronym':acronym,'Source':source,'Rank':rank ,'DBLP':dblp,'hasdata?': has_data,'Primary FoR':primary_for,'Comments':comments,'Average Rating':average_rating,'href':href}, ignore_index=True)
#                 elif(rank=="A"):
#                     df_coreA = df_coreA.append({'Title':title,'Acronym':acronym,'Source':source,'Rank':rank ,'DBLP':dblp,'hasdata?': has_data,'Primary FoR':primary_for,'Comments':comments,'Average Rating':average_rating,'href':href}, ignore_index=True)
#                 elif(rank=="B"):
#                     df_coreB = df_coreB.append({'Title':title,'Acronym':acronym,'Source':source,'Rank':rank ,'DBLP':dblp,'hasdata?': has_data,'Primary FoR':primary_for,'Comments':comments,'Average Rating':average_rating,'href':href}, ignore_index=True)
#                 elif(rank=="C"):
#                     flag=1
#                 else:
#                     continue
#         if(flag==1):
#             break
# df_coreA_s.to_excel('core_A*_data.xlsx')
# df_coreA.to_excel('core_A_data.xlsx')
# df_coreB.to_excel('core_B_data.xlsx')

# #PROFESSOR DATA SCRAPING
# URL = "https://iiitd.irins.org/"
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, "html.parser")
# content = soup.findAll('ul',class_="list-group sidebar-nav-v1")
# links = content[0].findAll('li')
# dept=[]
# lin=[]
# titles = ['Name','URL','Orcid Id','Orcid','Scopus Id','Scopus','Researcher Id','Researcher','Google Scholar Id','Google Scholar']
# db = pd.DataFrame(columns=titles)
# for l in links:
#     c = l.find('a',href=True)
#     lin.append(c['href'])
#     dept.append(c.text.strip())

# for l in lin:
#     URL = l
#     page = requests.get(URL)
#     soup = BeautifulSoup(page.content, "html.parser")
#     c1 = soup.find('div',class_="cbp-l-grid-agency")
#     c2 = c1.findAll('div',class_="cbp-item")
#     for i in c2:
#         name= i.find('h3').text.strip()
#         print(name)
#         url_ = i.find('a',class_="btn-u btn-u-xs btn-u-sea mt10",href=True)['href']
#         db = db.append({'Name':name,'URL':url_},ignore_index=True)
# count=0
# for ind,p in db.iterrows():
#     URL= p['URL']
#     page = requests.get(URL)
#     soup = BeautifulSoup(page.content, "html.parser")
#     c = soup.findAll('div',id="identity-view")
#     for c1 in c:
#         c2 = c1.findAll('span',id="i_orcid_id")
#         if len(c2)!=0:
#             id = c2[0].find('a',href=True)
#             p['Orcid Id'] = id.text.strip()
#             p['Orcid'] = id['href']
#         else:
#             p['Orcid Id'] = "NO"
#             p['Orcid'] = "NO"
#         c2 = c1.findAll('span',id="i_scopus_id")
#         if len(c2) != 0:
#             id = c2[0].find('a',href=True)
#             p['Scopus Id'] = id.text.strip()
#             p['Scopus'] = id['href']
#         else:
#             p['Scopus Id'] = "NO"
#             p['Scopus'] = "NO"
#         c2 = c1.findAll('span',id="i_isi_id")
#         if len(c2) != 0:
#             id = c2[0].find('a',href=True)
#             p['Researcher Id'] = id.text.strip()
#             p['Researcher'] = id['href']
#         else:
#             p['Researcher Id'] = "NO"
#             p['Researcher'] = "NO"
#         c2 = c1.findAll('span',id="i_google_sid")
#         if len(c2) != 0:
#             id = c2[0].find('a',href=True)
#             p['Google Scholar Id'] = id.text.strip()
#             p['Google Scholar'] = id['href']
#         else:
#             p['Google Scholar Id'] = "NO"
#             p['Google Scholar'] = "NO"
#     count = count+1
#     print(count)
# db.to_excel('prof_data.xlsx')

# #CORE FILTER
# import pandas as pd

# data = pd.read_excel("/Users/manavsaini/Desktop/rank_with_upload_with_multi/ranking_tracker/backend/routes/scopus.xls")
# con=[]
# core_a_s = pd.read_excel("core_A*_data.xlsx")
# core_a = pd.read_excel("core_A_data.xlsx")
# core_b = pd.read_excel("core_B_data.xlsx")
# core_a_s_=[]
# core_a_=[]
# core_b_=[]
# rank = []
# core_a_s_d = pd.DataFrame(columns = data.columns)
# core_a_d = pd.DataFrame(columns = data.columns)
# core_b_d = pd.DataFrame(columns = data.columns)

# core_fil = pd.DataFrame(columns = data.columns)
# def is_year(stri):
#     try:
#         n = int(stri)
#         if(n>1000 and n<2022):
#             return True
#     except:
#         return False
# def n(stri):
#     if(stri[0].isdigit() and (stri[-2:]=="th" or stri[-2:]=="rd" or stri[-2:]=="nd")):
#         return True
#     else:
#         return False


# for i,k in core_a_s.iterrows():
#     try:
#         float(k["Title"])
#     except:
#         core_a_s_.append(k["Title"].upper())
# for i,k in core_a.iterrows():
#     try:
#         float(k["Title"])
#     except:
#         core_a_.append(k["Title"].upper())
# for i,k in core_b.iterrows():
#     try:
#         float(k["Title"])
#     except:
#         core_b_.append(k["Title"].upper())

# result=[]
# for ind,k in data.iterrows():
#     try:
#         float(k["Conference name"])
#     except:
#         da = k["Conference name"].split(",")
#         da = da[:-1]
#         s_=""
#         for i in da:
#             s_=s_+i+","
#         if(s_!=""):
#             s__=s_.split()
#             s_s=""
#             for i in s__:
#                 if(is_year(i)):
#                     continue
#                 elif(n(i)):
#                     continue
#                 else:
#                     s_s=s_s+i+" "
#             res = s_s[:-2].upper()
#             if(res in core_a_s_):
#                 core_fil = core_fil.append(data.iloc[ind])
#                 rank.append("COREA*")
#                 core_a_s_d = core_a_s_d.append(data.iloc[ind])
#             elif(res in core_a_):
#                 core_fil = core_fil.append(data.iloc[ind])
#                 rank.append("COREA")
#                 core_a_d = core_a_d.append(data.iloc[ind])
#             elif(res in core_b_):
#                 core_fil = core_fil.append(data.iloc[ind])
#                 rank.append("COREB")
#                 core_b_d = core_b_d.append(data.iloc[ind])
# core_fil["rank"]=rank
# core_fil.to_csv("fil_core.csv")

# #JCR FILTER
# import pandas as pd

# data_og = pd.read_excel("/Users/manavsaini/Desktop/rank_with_upload_with_multi/ranking_tracker/backend/routes/scopus.xls")
# data = pd.read_excel("/Users/manavsaini/Desktop/rank_with_upload_with_multi/ranking_tracker/backend/routes/JCR.xlsx")
# p = pd.DataFrame(columns=data_og.columns)
# l=[]
# jcr=[]
# jc=[]
# for i,d in data.iterrows():
#     jcr.append(d['category'][-3:-1])
# for i,d in data.iterrows():
#     try:
#         float(d["journal_name"])
#     except:
#         l.append(d["journal_name"].upper())

# for i,d in data_og.iterrows():
#     try:
#         float(d['Source title'])
#     except:
#         if(d['Source title'].upper() in l):
#             p=p.append(data_og.iloc[i])
#             jc.append("JCR"+jcr[i])
# p["rank"]=jc
# print(p)
# p.to_csv("fil_jcr.csv")

# #Final Data 
# core = pd.read_csv("fil_core.csv")
# jcr = pd.read_csv("fil_jcr.csv")
# data = pd.DataFrame()
# pages=[]
# for i,k in core.iterrows():
#     pages.append(str(k["Page start"])+"-"+str(k["Page end"]))
# core["pages"] = pages
# for i,k in core.iterrows():
#     data = data.append(core.iloc[i])
# for i,k in jcr.iterrows():
#     data = data.append(jcr.iloc[i])

# doi_url=[]
# for i,k in data.iterrows():
#     doi_url.append("http://doi.org/"+str(k["DOI"]))
# data["doi_url"]=doi_url

# #Assigning Author
# prof_data = pd.read_excel("prof_data.xlsx")
# prof_name = list(prof_data["Name"])
# prof_sc_id = list(prof_data["Scopus Id"])

# author =[]
# for i,k in data.iterrows():
#     ids = k["Author(s) ID"].split(";")
#     a=[]
#     for j in ids:
#         if(j in prof_sc_id):
#             a.append(prof_name[prof_sc_id.index(j)])
#     author.append(a)

# auth = []
# for i in author:
#     if(len(i)==0):
#         auth.append("")
#     else:
#         auth.append(i[0])

# data["Author"]=auth
# data.columns = ['Unnamed: 0', 'Authors', 'AuthorID', 'Title', 'Year',
#        'Sourcetitle', 'Volume', 'Issue', 'ArtNo', 'Page_start', 'Page_end',
#        'Page count', 'Cited_by', 'DOI', 'Link', 'Affiliations',
#        'Authors_with_affiliations', 'Abstract', 'Author Keywords',
#        'Index Keywords', 'Molecular Sequence Numbers', 'Chemicals/CAS',
#        'Tradenames', 'Manufacturers', 'Funding Details', 'Funding Text 1',
#        'Funding Text 2', 'Funding Text 3', 'Funding Text 4', 'Funding Text 5',
#        'Funding Text 6', 'Funding Text 7', 'Funding Text 8', 'Funding Text 9',
#        'Funding Text 10', 'References', 'Correspondence Address', 'Editors',
#        'Sponsors', 'Publisher', 'Conference_name', 'Conference_date',
#        'Conference_location', 'Conference_code', 'ISSN', 'ISBN', 'CODEN',
#        'PubMed ID', 'Language of Original Document',
#        'Abbreviated Source Title', 'Document Type', 'Publication Stage',
#        'Open Access', 'Source', 'EID', 'rank','pages', 'doi_url','IIITD']
# data.to_csv("rankdata.csv")

data = pd.read_csv("rankdata.csv")
import pymongo
import json 

client = pymongo.MongoClient("mongodb+srv://manav:3695@cluster0.3jv4ea1.mongodb.net/?retryWrites=true&w=majority")
d = data.to_dict(orient='records')
client.drop_database("test")
db = client["test"]
db.ranks.insert_many(d)


