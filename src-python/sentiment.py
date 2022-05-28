import torch
import progressbar
import numpy as np 
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from os import walk

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("MilaNLProc/feel-it-italian-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("MilaNLProc/feel-it-italian-sentiment")

files = []
for (dirpath, dirnames, filenames) in walk("./tracks"):
    files.extend(filenames)
    break

song_stats = []

for to_read_file in progressbar.progressbar(files):
    f = open("./tracks/"+to_read_file)
    data = json.load(f)
    trackLyrics = data['trackLyrics']
    song_info = {"numberOfRows": len(trackLyrics['lines']), "positiveScore": 0, "negativeScore": 0 }
    for i in trackLyrics['lines']:
        sentence = i['words']
        inputs = tokenizer(sentence, return_tensors="pt")
        # Call the model and get the logits
        labels = torch.tensor([1]).unsqueeze(0)
        outputs = model(**inputs, labels=labels)
        loss, logits = outputs[:2]
        logits = logits.squeeze(0)
        # Extract probabilities
        proba = torch.nn.functional.softmax(logits, dim=0)
        negative, positive = proba
        song_info["negativeScore"] += np.round(negative.item(),4)
        song_info["positiveScore"] += np.round(positive.item(),4)
    f.close()
    song_stats.append(song_info)

with open("pyPhasesSentiment.json", "w+") as nf:
  data = nf.read()
  nf.write(str(song_stats))

