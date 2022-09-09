import datetime

def main():
    one_year_ago = datetime.date.today() - datetime.timedelta(days=3*365)
    print(one_year_ago)
    
main()