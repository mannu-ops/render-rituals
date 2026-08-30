import os
from PIL import Image, ImageFilter
import numpy as np

def remove_dark_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]
    
    # Calculate luminance / brightness
    # The background is very dark slate / black (values around < 35)
    # The character has bright pink sweater, skin tones, black hair with highlights, tablet with cyan/white glow
    
    # Let's inspect the corner color
    top_left_color = np.mean(arr[0:15, 0:15, :3], axis=(0,1))
    print("Corner background color:", top_left_color)
    
    # Distance from corner background color
    diff = np.sqrt((r - top_left_color[0])**2 + (g - top_left_color[1])**2 + (b - top_left_color[2])**2)
    
    # Create smooth alpha ramp
    # Below low_thresh -> alpha = 0 (transparent)
    # Above high_thresh -> alpha = 255 (opaque)
    low_thresh = 15.0
    high_thresh = 45.0
    
    alpha = np.clip((diff - low_thresh) / (high_thresh - low_thresh), 0.0, 1.0) * 255.0
    
    # Hair protection: ensure center hair and character are not accidentally made transparent
    # Flood fill or mask refinement
    h, w = diff.shape
    center_y, center_x = h // 2, w // 2
    
    # Set the new alpha channel
    arr[:, :, 3] = alpha.astype(np.uint8)
    
    result = Image.fromarray(arr.astype(np.uint8), "RGBA")
    result.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    src = r"public/images/nikita-waving-avatar.jpg"
    dst = r"public/images/nikita-waving-avatar.png"
    if os.path.exists(src):
        remove_dark_background(src, dst)
    else:
        print("Source file not found")
