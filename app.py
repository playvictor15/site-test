import random

# Lista de 30 cores em formato hexadecimal
cores = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#FF8333", "#33FFF4", "#F433FF", 
    "#FFBD33", "#33FFBD", "#BD33FF", "#FF3333", "#33FF8A", "#8A33FF", "#FFA133", "#33FFA1",
    "#A1FF33", "#FF33BD", "#BD33FF", "#FF5733", "#3357FF", "#57FF33", "#FF3357", "#5733FF",
    "#33FFA1", "#FFA1FF", "#33FFD7", "#FFD733", "#33FF57", "#57FFBD"
]

def escolher_cor():
    """Retorna uma cor aleatória da lista de cores."""
    return random.choice(cores)

# Exemplo de uso
print(escolher_cor())
