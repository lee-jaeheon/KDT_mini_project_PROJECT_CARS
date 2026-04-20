import cv2
import numpy as np
import os

base = 'c:/work/Transfer_learning/mini_poject/images/'
files = [
    'benz_300sl.jpg',
    'porsche_911.jpg',
    'Lamborghini Miura.jpg',
    'McLaren_F1.jpg',
    'Bugatti_Veyron.jpg',
    'Hyundai_Ioniq_5.jpg',
]

for f in files:
    img = cv2.imread(base + f)
    h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(img, mask, (10, 10, w - 20, h - 20), bgd, fgd, 8, cv2.GC_INIT_WITH_RECT)
    fg = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = fg * 255
    out = os.path.splitext(f)[0] + '_nobg.png'
    cv2.imwrite(base + out, rgba)
    print('Done:', out)

print('All done')
