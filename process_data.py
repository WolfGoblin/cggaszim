import pandas as pd
import json
import os

excel_file = "/Users/yako/Documents/CG GAS/CG GAS Website/CG_Gas_Product_Data.xlsx"
base_dir = "/Users/yako/Documents/CG GAS/CG GAS Website"

try:
    df_dict = pd.read_excel(excel_file, sheet_name=None)
except Exception as e:
    print(f"Error reading excel: {e}")
    df_dict = {}

output_data = {}

for sheet_name, df in df_dict.items():
    output_data[sheet_name] = df.fillna("").to_dict(orient="records")

with open(os.path.join(base_dir, "portal", "products.json"), "w") as f:
    json.dump(output_data, f, indent=2)

print("Data exported to portal/products.json")
