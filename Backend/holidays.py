from datetime import datetime
import requests
import json 

YEAR = datetime.now().year

def get_country_code() -> str:
    try:
        response = requests.get(
            "https://ipapi.co/json/",
            timeout=5,
        )
            
        response.raise_for_status()

        data = response.json()

        return data["country_code"]
    except Exception:
        return "EC"

country = get_country_code()

url = (
    f"https://date.nager.at/api/v3/PublicHolidays/"
    f"{YEAR}/{country}"
)

response = requests.get(url, timeout=10)
response.raise_for_status()

holidays = []

for holiday in response.json():
    holidays.append({
        "date": holiday["date"],
        "name": holiday["localName"],
        "englishName": holiday["name"],
        "countryCode": holiday["countryCode"],
        "global": holiday["global"],
    })

with open("/tmp/holidays.json", "w") as f:
    json.dump(
        holidays,
        f,
        indent=4,
        ensure_ascii=False
    )

