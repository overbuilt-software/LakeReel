import { NextRequest, NextResponse } from "next/server";

function degreesToCompass(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon required" }, { status: 400 });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min
    if (!res.ok) throw new Error("Open-Meteo fetch failed");

    const data = await res.json();
    const current = data.current;

    return NextResponse.json({
      airTemp: `${Math.round(current.temperature_2m)}°F`,
      wind: `${Math.round(current.wind_speed_10m)} mph ${degreesToCompass(current.wind_direction_10m)}`,
    });
  } catch {
    return NextResponse.json({ error: "Weather unavailable" }, { status: 503 });
  }
}
