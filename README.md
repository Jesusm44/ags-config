// AGS Calendar Widget

A calendar widget built with **AGS v3**, **TypeScript**, and **GNIM** for Linux desktops.

// Features

- Monthly calendar view
- Day selection
- Google Calendar integration
- Event indicators
- Current date highlighting
- Weather information
- Forecast display
- Clock widget
- Month navigation
- Reactive UI using GNIM

// Preview

![Preview](./assets/preview.png)

// Requirements

- AGS v3
- GTK4
- TypeScript
- Google Calendar API (optional)
- Weather API (optional)

// Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/ags-calendar.git
cd ags-calendar
```

Install dependencies:

```bash
npm install
```

Run AGS:

```bash
ags run
```

// Project Structure

```text
.
├── services/
│   ├── calendar.ts
│   ├── googleCalendar.ts
│   └── weather.ts
│
├── widgets/
│   └── calendar/
│       ├── Clock.tsx
│       ├── Events.tsx
│       ├── Forecast.tsx
│       ├── MonthCalendar.tsx
│       └── Weather.tsx
│
└── windows/
    └── Calendar.tsx
```

// Current Status

/// Completed

- Calendar grid generation
- Date selection
- Month navigation
- Event indicators
- Weather widget
- Forecast widget
- Clock widget

// Planned

- Year selector
- Month dropdown selector
- Previous/next month day display
- Improved styling
- Better popup navigation
- Additional calendar views

// Screenshots

Add screenshots inside the `assets/` directory and update the paths in this README.

// License

MIT License
