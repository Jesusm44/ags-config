from google.oauth2.credentials import Credentials 
from googleapiclient.discovery import build
from datetime import datetime, timedelta 
import sys
from datetime import datetime, timedelta

event_id = sys.argv[1]
title = sys.argv[2]
date = sys.argv[3]

creds = Credentials.from_authorized_user_file(
    "/home/jesusm/.config/ags/credentials/token.json"
)

service = build(
    "calendar",
    "v3",
    credentials=creds,
)

start = datetime.fromisoformat(date)
end = start + timedelta(hours=1)

event = {
    "summary": title,
    "start": {
        "dateTime": start.isoformat(),
        "timeZone": "America/Guayaquil",
    },
    "end": {
        "dateTime": end.isoformat(),
        "timeZone": "America/Guayaquil"
    }
}

update = service.events().update(
    calendarId="primary",
    eventId=event_id,
    body=event,
).execute()

