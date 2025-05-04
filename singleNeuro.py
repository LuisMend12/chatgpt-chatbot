import random
import numpy as np

class Neuron:

    def __init__(self, bias, weights, inputs, output):
        self.bias = bias
        self.weights = weights
        self.inputs = inputs
        self.output = 0

    def forwards(self):
        return self.inputs
    
class NeuralNetwork:
    def __init__(self, input_size = 784, hidden_layers=[512, 512], output_size=10):
        self.input_size = input_size
        self.hidden_layers = hidden_layers
        self.output_size = output_size
        self.weights = []
        self.biases = []

        self.weights.append(0.01 * np.random.randn(input_size, hidden_layers[0]))
        self.biases.append(np.zeros((1, hidden_layers[0])))

        for i in range(len(hidden_layers)-1):
            self.weights.append(0.01 * np.random.randn(hidden_layers[i], hidden_layers[i+1]))
            self.biases.append(np.zeros((1, hidden_layers[i+1])))

        self.weights.append(0.01 * np.random.randn(hidden_layers[len(hidden_layers) - 1], output_size))
        self.biases.append(np.zeros((1, output_size))) 


    def forward(self, inputs):
        layers  = [inputs]

        for i in range(len(self.weights)):
            layers.append(np.dot(layers[-1], self.weights[i]) + self.biases[i])

        return layers[-1]
    

# mySingleNeuron = Neuron(
#     bias = 3,
#     weights = [0.3, 0.5, 0.1]
# )