from data_loader import load_data
from model import train_model, evaluate_model, save_model

def main():
    data_path = 'data/dataset.csv'
    X_train, X_test, y_train, y_test = load_data(data_path)
    model = train_model(X_train, y_train)
    evaluate_model(model, X_test, y_test)
    save_model(model)

if __name__ == '__main__':
    main()
