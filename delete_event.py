from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import sys

event_id = sys.argv[1]

creds = Credentials.from_authorized_user_file(
    "/home/jesusm/.config/ags/credentials/token.json"
)

service = build(
    "calendar",
    "v3",
    credentials=creds,
)

service.events().delete(
    calendarId="primary",
    eventId=event_id,
).execute()

print(f"Deleted: {event_id}")