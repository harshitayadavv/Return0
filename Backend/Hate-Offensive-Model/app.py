from flask import Flask, request, jsonify
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained("./new_model")
model = AutoModelForSequenceClassification.from_pretrained("./new_model")

device = torch.device("cpu")
model.to(device)

def predict(text):
    model.eval()
    encoding = tokenizer(text, truncation=True, padding=True, max_length=64, return_tensors="pt")
    input_ids, attention_mask = encoding["input_ids"].to(device), encoding["attention_mask"].to(device)
    
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        prediction = torch.argmax(outputs.logits, dim=1).item()
    
    return "Offensive" if prediction == 1 else "Not Offensive"

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.get_json()  
    text = data.get('text')  
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    result = predict(text)
    
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
