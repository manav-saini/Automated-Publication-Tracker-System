import requests
from bs4 import BeautifulSoup
import pandas as pd
import pymongo
# def scrape(URL):
#     page = requests.get(URL,headers = {'User-agent': 'your bot 0.1'})
#     soup = BeautifulSoup(page.content, "html.parser")
#     t = soup.find("table",class_="gsc_mp_table")
#     l=[]
#     count=0
#     for i in t.find_all("tr"):
#         if(count<10):
#             i_ = i.find("td",class_="gsc_mvt_t")
#             if isinstance(i_, type(None)):
#                 continue
#             else:
#                 l.append(i_.text.strip().upper())
#                 count+=1
#         else:
#             break
#     return l

# E_CS_v = list(scrape("https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=eng"))
# P_A_M_v = list(scrape("https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=phy_pureappliedmathematics"))
# SS_v = list(scrape("https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=soc"))
# LS_ES_v = list(scrape("https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=bio"))

# print("Scraping Done")

# d = {"E_CS_v":E_CS_v,"P_A_M_v":P_A_M_v,"SS_v":SS_v,"LS_ES_v":LS_ES_v}
# df = pd.DataFrame.from_dict(d)
# df.to_csv("GS_top10.csv")

df = pd.read_csv("GS_top10.csv")
E_CS_v = list(df["E_CS_v"])
P_A_M_v = list(df["P_A_M_v"])
SS_v = list(df["SS_v"])
LS_ES_v = list(df["LS_ES_v"])

df_2= pd.read_excel("scopus_d.xls")
col = list(df_2.columns)
col.append("rank")
col.append("doi_url")
df_g = pd.DataFrame(columns=col)


for i,d in df_2.iterrows():
    try:
        float(d['Source title'])
    except:
        if d["Source title"].upper() in E_CS_v:
            sub_dic = dict(df_2.iloc[i])
            sub_dic["rank"] = "Google Top Venues Engineered and Computer Science"
            sub_dic["doi_url"] = "http://doi.org/"+d["DOI"]
            df_g = df_g.append(sub_dic,ignore_index=True)
        elif d["Source title"].upper() in P_A_M_v:
            sub_dic = dict(df_2.iloc[i])
            sub_dic["rank"] = "Google Top Venues Pure and Applied Mathematics"
            sub_dic["doi_url"] = "http://doi.org/"+d["DOI"]
            df_g = df_g.append(sub_dic,ignore_index=True)
        elif d["Source title"].upper() in SS_v:
            sub_dic = dict(df_2.iloc[i])
            sub_dic["rank"] = "Google Top Venues Social Sciences"
            sub_dic["doi_url"] = "http://doi.org/"+d["DOI"]
            df_g = df_g.append(sub_dic,ignore_index=True)
        elif d["Source title"].upper() in LS_ES_v:
            sub_dic = dict(df_2.iloc[i])
            sub_dic["rank"] = "Google Top Venues Life Sciences and Earth Sciences"
            sub_dic["doi_url"] = "http://doi.org/"+d["DOI"]
            df_g = df_g.append(sub_dic,ignore_index=True)

#Assigning Author
prof_data = pd.read_excel("prof_data.xlsx")
prof_name = list(prof_data["Name"])
prof_sc_id = list(prof_data["Scopus Id"])

author =[]
for i,k in df_g.iterrows():
    ids = k["Author(s) ID"].split(";")
    a=[]
    for j in ids:
        if(j in prof_sc_id):
            a.append(prof_name[prof_sc_id.index(j)])
    author.append(a)

auth = []
for i in author:
    if(len(i)==0):
        auth.append("")
    else:
        auth.append(i[0])
df_g["IIITD"]=auth
df_g.columns = [ 'Authors', 'Author(s) ID', 'Title', 'Year',
       'Sourcetitle', 'Volume', 'Issue', 'ArtNo', 'Page_start', 'Page_end',
       'Page count', 'Cited_by', 'DOI', 'Link', 'Affiliations',
       'Authors_with_affiliations', 'Abstract', 'Author Keywords',
       'Index Keywords', 'Molecular Sequence Numbers', 'Chemicals/CAS',
       'Tradenames', 'Manufacturers', 'Funding Details', 'Funding Text 1',
       'Funding Text 2', 'Funding Text 3', 'Funding Text 4', 'Funding Text 5',
       'Funding Text 6', 'Funding Text 7', 'Funding Text 8', 'Funding Text 9',
       'Funding Text 10', 'References', 'Correspondence Address', 'Editors',
       'Sponsors', 'Publisher', 'Conference_name', 'Conference_date',
       'Conference_location', 'Conference_code', 'ISSN', 'ISBN', 'CODEN',
       'PubMed ID', 'Language of Original Document',
       'Abbreviated Source Title', 'Document Type', 'Publication Stage',
       'Open Access', 'Source', 'EID', 'rank', 'doi_url','IIITD']
df_g.to_csv("df.csv")
client = pymongo.MongoClient("mongodb+srv://manav:3695@cluster0.3jv4ea1.mongodb.net/?retryWrites=true&w=majority")
d = df_g.to_dict(orient='records')
db = client["test"]
db.ranks.insert_many(d)







