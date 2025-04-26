# data_loader.py
import pandas as pd
from sklearn.model_selection import train_test_split

def load_data(path, test_size=0.2, random_state=42):
    df = pd.read_csv(path)
    X = df.drop('label', axis=1)
    y = df['label']
    return train_test_split(X, y, test_size=test_size, random_state=random_state)

