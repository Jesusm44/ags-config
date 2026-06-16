from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

flow = InstalledAppFlow.from_client_secrets_file(
    "/home/jesusm/.config/ags/credentials/client_secret_688185329092-sldin8adecso49cpimrn79vv9c1m6c3o.apps.googleusercontent.com.json",
    SCOPES,
)

creds = flow.run_local_server(port=0)

with open("/home/jesusm/.config/ags/credentials/token.json", "w") as f:
    f.write(creds.to_json())

print("Token creado correctamente")