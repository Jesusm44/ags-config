from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timezone
import json

creds = Credentials.from_authorized_user_file(
    "/home/jesusm/.config/ags/credentials/token.json"
)

service = build("calendar", "v3", credentials=creds)

now = datetime.now(timezone.utc).isoformat()

today = datetime.now().replace(
    hour=0,
    minute=0,
    second=0,
    microsecond=0,
).astimezone(timezone.utc)

events = service.events().list(
    calendarId="primary",
    timeMin=today.isoformat(),
    maxResults=1000,
    singleEvents=True,
    orderBy="startTime",
).execute()

result = []

for event in events.get("items", []):
    start = event["start"].get(
        "dateTime",
        event["start"].get("date", "")
    )

    end = event["end"].get(
        "dateTime",
        event["end"].get("date", "")
    )

    result.append({
        "id": event.get("id", ""),
        "title": event.get("summary", "No title"),
        "start": start,
        "end": end,
    })

with open("/tmp/google-calendar.json", "w") as f:
    json.dump(result, f)

print(f"Guardados {len(result)} eventos /tmp/google-calendar.json")