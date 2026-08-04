import json
import os
import re

base_dir = "/Users/yako/Documents/CG GAS/CG GAS Website"
products_file = os.path.join(base_dir, "portal", "products.json")

with open(products_file, "r") as f:
    data = json.load(f)

# Collect all images
image_paths = []
for root, dirs, files in os.walk(base_dir):
    if "portal" in root:
        continue
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            image_paths.append(os.path.join(root, file).replace(base_dir + "/", "../"))

def find_best_image(product_name, category):
    best_match = None
    max_matches = 0
    
    name_words = re.sub(r'[^a-zA-Z0-9 ]', ' ', product_name.lower()).split()
    
    for img_path in image_paths:
        img_name = os.path.basename(img_path).lower()
        img_name_words = re.sub(r'[^a-zA-Z0-9 ]', ' ', img_name).split()
        
        matches = sum(1 for word in name_words if word in img_name_words and len(word) > 2)
        
        # Boost if category is in the path
        if category.lower() in img_path.lower():
            matches += 1
            
        if matches > max_matches:
            max_matches = matches
            best_match = img_path
            
    return best_match

# Match Fireplaces
if "Fireplaces" in data:
    for product in data["Fireplaces"]:
        img = find_best_image(product["Product Name"], product.get("Category", ""))
        product["Image"] = img

# Match Geysers
if "Geysers" in data:
    for product in data["Geysers"]:
        img = find_best_image(product["Product Name"], "Geysers")
        product["Image"] = img

with open(products_file, "w") as f:
    json.dump(data, f, indent=2)

print("Images matched and updated in products.json")
