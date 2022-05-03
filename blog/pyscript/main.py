from typing import Optional

import numpy as np
from matplotlib import pyplot as plt

fig: Optional[plt.Figure] = None

if __name__ == "__main__":
    x = np.arange(0, 20, 0.01)
    y = np.sin(x)

    fig, ax = plt.subplots()

    ax.set_title("pyscript test figure")
    ax.set_xlabel("x")
    ax.set_ylabel("sin(x)")
    ax.plot(x, y)

fig