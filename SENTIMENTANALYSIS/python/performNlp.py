# Import the libraries
from dotenv import load_dotenv
load_dotenv()

from newspaper import Article
from newspaper import Config
from textblob import TextBlob
import nltk
from pymongo import MongoClient
import os
import time
import datetime

nltk.download('punkt')  # 1 time download of the sentence tokenizer
cluster = MongoClient(os.getenv('PYTHONURI'))
db = cluster['test']
collections = db['links']



def addDataToMongo(url,date, county, newspaper,summary, keywords, sentiment, fulltext):
    query ={
      "url": url,
    }
    data = {'$setOnInsert':{
        "datePublished": date,
        "county": county.capitalize(),
        "newspaper" : newspaper,
        "summary": summary,
        "keywords": keywords,
        "sentiment": sentiment.capitalize(),
        "fullText": fulltext,
        "url": url,
        "dateScraped": datetime.datetime.utcnow(),

    }}
    db['sentimentAnalysis'].update_one(query,data,upsert=True)
    print('added to db')


for link in collections.find({}, {"_id": 1, "urls": 1,"county":1, "newspaper":1}):
    print("this is a link", link['urls'])
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'

    config = Config()
    config.memoize_articles = False
    config.fetch_images = False
    config.verbose = True #disable later
    config.https_success_only = False

    config.browser_user_agent = user_agent
    article = Article(url=link['urls'], config=config)

    # Do some NLP
    article.download()  # Downloads the link’s HTML content
    time.sleep(15)
    print("state:", article.download_state)
    while article.download_state != 2:
        print("this url is having issues", article)
        time.sleep(10)
        break
    if article.download_state == 2:
        article.parse()  # Parse the article
        article.nlp()  # Keyword extraction wrapper
        date = article.publish_date
        print('this is the date:', date)
        fulltext = article.text
        # print("this is the fulltext",fulltext )

        keywords = article.keywords
        # print("this is the keywords",keywords )

        summary = article.summary  # print text
        # print("this is the summary",summary )

        sentiment = ''
        sentimentValue = TextBlob(summary).sentiment.polarity
        if sentimentValue == 0:
            sentiment = 'neutral'
            print('The text is neutral')
        elif sentimentValue > 0:
            sentiment = 'positive'
            print('The text is positive')
        else:
            sentiment = 'negative'
            print('The text is negative')
        url = link['urls']
        newspaper = link['newspaper']
        county = link['county']

        addDataToMongo(url, date, county, newspaper,summary, keywords, sentiment, fulltext)
        time.sleep(10)
        collections.delete_one({"urls":link['urls']});
        # db.collections.remove({"urls": link['urls']})
