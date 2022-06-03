import time
from typing import Optional

import numpy as np
from matplotlib import pyplot as plt
import js


def create_figure() -> plt.Figure:
    time.sleep(1)
    x = np.arange(0, 20, 0.01)
    y = np.sin(x)

    fig = plt.figure()
    ax = fig.subplots()

    ax.set_title("pyscript test figure")
    ax.set_xlabel("x")
    ax.set_ylabel("sin(x)")
    ax.plot(x, y)
    return fig


fig: Optional[plt.Figure] = None

if __name__ == "__main__":
    fig = create_figure()
    js.document.getElementById("status").textContent = ""

fig
