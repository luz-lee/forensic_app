import numpy as np
import cv2
import random

def resize_image(img, shape):
    return cv2.resize(img, (shape[1], shape[0]), interpolation=cv2.INTER_LINEAR)

def text_to_image(text, img_shape, font=cv2.FONT_HERSHEY_SIMPLEX, font_scale=3, thickness=5):
    text_size = cv2.getTextSize(text, font, font_scale, thickness)[0]
    text_x = (img_shape[1] - text_size[0]) // 2
    text_y = (img_shape[0] + text_size[1]) // 2

    img_wm = np.zeros(img_shape, dtype=np.uint8)
    cv2.putText(img_wm, text, (text_x, text_y), font, font_scale, (255, 255, 255), thickness)

    return img_wm

def apply_watermark(img, text, alpha=5):
    height, width = img.shape[:2]
    img_wm = text_to_image(text, (height, width))
    
    img_f = np.fft.fft2(img)
    
    y_random_indices, x_random_indices = list(range(height)), list(range(width))
    random.seed(2021)
    random.shuffle(x_random_indices)
    random.shuffle(y_random_indices)
    
    random_wm = np.zeros(img.shape, dtype=np.uint8)
    
    for y in range(height):
        for x in range(width):
            random_wm[y_random_indices[y], x_random_indices[x]] = img_wm[y, x]
    
    result_f = img_f + alpha * random_wm
    
    result = np.fft.ifft2(result_f)
    result = np.real(result)
    result = result.astype(np.uint8)
    
    return result

def extract_watermark(img_ori, img_input, alpha=5):
    height, width = img_ori.shape[:2]
    
    img_input = resize_image(img_input, (height, width))
    
    img_ori_f = np.fft.fft2(img_ori)
    img_input_f = np.fft.fft2(img_input)
    
    watermark = (img_input_f - img_ori_f) / alpha
    watermark = np.real(watermark).astype(np.uint8)
    
    y_random_indices, x_random_indices = list(range(height)), list(range(width))
    random.seed(2021)
    random.shuffle(x_random_indices)
    random.shuffle(y_random_indices)
    
    result2 = np.zeros(watermark.shape, dtype=np.uint8)
    
    for y in range(height):
        for x in range(width):
            result2[y, x] = watermark[y_random_indices[y], x_random_indices[x]]
    
    return watermark, result2
