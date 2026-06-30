from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from datetime import datetime, timezone
import os
import json

SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

TOKEN_FILE = "/home/jesusm/.config/ags/credentials/token.json"
CREDENTIALS_FILE = "/home/jesusm/.config/ags/credentials/client_secret_688185329092-sldin8adecso49cpimrn79vv9c1m6c3o.apps.googleusercontent.com.json"

creds = None

if os.path.exists(TOKEN_FILE):
    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            CREDENTIALS_FILE,
            SCOPES,
        )
        creds = flow.run_local_server(port=0)

    with open(TOKEN_FILE, "w") as token:
        token.write(creds.to_json())

service = build("calendar", "v3", credentials=creds)

today = (
    datetime.now()
    .replace(hour=0, minute=0, second=0, microsecond=0)
    .astimezone(timezone.utc)
)

events = service.events().list(
    calendarId="primary",
    timeMin=today.isoformat(),
    maxResults=1000,
    singleEvents=True,
    orderBy="startTime",
).execute()

result = []

for event in events.get("items", []):
    start = event["start"].get("dateTime", event["start"].get("date", ""))
    end = event["end"].get("dateTime", event["end"].get("date", ""))

    result.append({
        "id": event.get("id", ""),
        "title": event.get("summary", "No title"),
        "start": start,
        "end": end,
    })

with open("/tmp/google-calendar.json", "w") as f:
    json.dump(result, f, indent=2)