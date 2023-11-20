
from flask import Flask, request, jsonify
import pandas as pd

import pandas as pd
from sklearn.decomposition import PCA
from sklearn.neighbors import KNeighborsClassifier
import time
# Specify the file path
file_path = "/Users/festring/Desktop/TSL/test1/flask/for_knn.csv"

# Read the CSV file into a DataFrame
data = pd.read_csv(file_path)

# Print the DataFrame
# print(data)
X = data.iloc[:, 0:5]
y = data.iloc[:, 5]

pca = PCA(n_components=4)
X_pca = pca.fit_transform(X)

neigh = KNeighborsClassifier(n_neighbors=1)
neigh.fit(X_pca, y)


app = Flask(__name__)

def find_alba(df):
    num = len(df)
    # print(num)
    day = len(df['date'].value_counts())
    # print(day)
    coupang_ratio = (df['seller'] == '판매자: 쿠팡(주)').sum() / num
    # print(coupang_ratio)

    # review_length = (df['length'] > 0).sum() / num
    
    sincere_review = (df['length'] > 0).count() 
    sincere_review_ratio = sincere_review / num
    # print(sincere_review_ratio)

    review_length = df['length'].sum() / sincere_review
    # print(review_length)
    # print(sincere_review)
    to_predict = [[num, sincere_review_ratio, coupang_ratio,  review_length, day]]
    transformed = pca.transform(to_predict)
    alba = neigh.predict(transformed)
    # print(int(alba[0]))

    return (int(alba[0]))


        
import random
@app.route('/process', methods=['POST'])
def process_data():
    # JSON 데이터를 받습니다.
    data = request.get_json()
    
    # print(data)
    print("-----------------")
    # print(data[0])
    # print("-----------------")
    # print(data[1])
    result = []
    
    # # Convert data to list
    data_list = list(data.values())
    # data_list_0 = data_list[0]
    data_list = pd.DataFrame(data_list)
    # data_list.to_csv('test1.csv', index=False)
    x = data_list.values.tolist()

    try:
        # convert(x, 0)
        try:
            y = x[0][0][1:]
            df = pd.DataFrame(y, columns=['name', 'date', 'seller', 'length'])
            df['date'] = pd.to_datetime(df['date'])  # Convert 'date' column to date
            df.to_csv('y0.csv', index=False)
            res = (find_alba(df))
            # print(res)
            result.append(res)
            # x.append(res)
        except:
            result.append(random.randint(0, 1))
        
        try:
            y = x[0][1][1:]
            df = pd.DataFrame(y, columns=['name', 'date', 'seller', 'length'])
            df['date'] = pd.to_datetime(df['date'])  # Convert 'date' column to date
            df.to_csv('y1.csv', index=False)
            res = (find_alba(df))
            # print(res)
            result.append(res)
            # x.append(res)
        except:
            result.append(random.randint(0, 1))
        try:    
            y = x[0][2][1:]
            df = pd.DataFrame(y, columns=['name', 'date', 'seller', 'length'])
            df['date'] = pd.to_datetime(df['date'])  # Convert 'date' column to date
            df.to_csv('y2.csv', index=False)
            res = (find_alba(df))
            # print(res)
            result.append(res)
            # x.append(res)
        except:
            result.append(random.randint(0, 1))

        try:
            y = x[0][3][1:]
            df = pd.DataFrame(y, columns=['name', 'date', 'seller', 'length'])
            df['date'] = pd.to_datetime(df['date'])  # Convert 'date' column to date
            df.to_csv('y3.csv', index=False)
            res = (find_alba(df))
            # print(res)
            result.append(res)
            # x.append(res)
        except:
            result.append(random.randint(0, 1))
        try:
            y = x[0][4][1:]
            df = pd.DataFrame(y, columns=['name', 'date', 'seller', 'length'])
            df['date'] = pd.to_datetime(df['date'])  # Convert 'date' column to date
            df.to_csv('y4.csv', index=False)
            res = (find_alba(df))
            # x.append(res)
            # print(res)
            result.append(res)
        except:
            result.append(random.randint(0, 1))
        print(result)
    except:
        print("error1")
        
    txt = "This is Alba"

    # 결과를 JSON 형식으로 반환합니다.
    # return jsonify(txt)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
 