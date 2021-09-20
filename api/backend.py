from flask import Flask, request, jsonify
import cv2
from flask.helpers import send_file
import numpy as np
from PIL import Image 
from tensorflow import keras
from matplotlib import pyplot as plt

app = Flask(__name__)

@app.route('/api/upload', methods=['POST'])
def classify():
    if (request.files['file']): 
        file = request.files['file']
        lungModel = keras.models.load_model('../Models/model_1.h5', compile=False)
        img = np.array(Image.open(file))
        test_img = cv2.resize(img, (256,256))
        test_img = cv2.cvtColor(test_img, cv2.IMREAD_COLOR)
        test_img = np.expand_dims(test_img, axis=0)
        prediction = lungModel.predict(test_img)
        prediction_image = prediction.reshape((256,256))
        data = Image.fromarray((prediction_image * 255).astype(np.uint8))
        data.save('image.png')
        # print('Model classification: ' + result)        
        return send_file('image.png')
        #return send_file(prediction_image, 'image/png')