# Import the libraries
from dotenv import load_dotenv
from newspaper import Article
from textblob import TextBlob
import nltk
import pymongo
import os
import time


load_dotenv()
nltk.download('punkt')  # 1 time download of the sentence tokenizer
MONGOURI = os.getenv("PYTHONURI")
client = pymongo.MongoClient(MONGOURI)
db = client.test
collections = db['allurls']



def addDataToMongo(url, summary, keywords, sentiment, fulltext):
    data = {
        "url": url,
        "summary": summary,
        "keywords": keywords,
        "sentiment": sentiment,
        "fullText": fulltext,

    }
    db['nlpData'].insert_one(data)
    print('added to db')


for link in collections.find({}, {"_id": 0, "urls": 1}):
    print("this is a link", link['urls'])
    article = Article(link['urls'])
    # Do some NLP
    article.download()  # Downloads the link’s HTML content

    while article.download_state != 2:
        print("this url is having issues", article)
        time.sleep(10)
        break
    if article.download_state == 2:
        article.parse()  # Parse the article
        article.nlp()  # Keyword extraction wrapper

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
        addDataToMongo(url, summary, keywords, sentiment, fulltext)

        time.sleep(10)
