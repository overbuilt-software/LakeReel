export type LiveConditions = {
  airTemp: string;
  wind: string;
  waterTemp: string;
  gageHeight: string;
};

function degreesToCompass(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export async function getLiveConditions(
  lat: number,
  lon: number,
  usgsSiteId: string | null
): Promise<LiveConditions> {
  const [weatherRes, usgsRes] = await Promise.allSettled([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`,
      { next: { revalidate: 1800 } }
    ),
    usgsSiteId
      ? fetch(
          `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${usgsSiteId}&parameterCd=00010,00065&siteStatus=active`,
          { next: { revalidate: 3600 } }
        )
      : Promise.resolve(null),
  ]);

  let airTemp = "—";
  let wind = "—";
  let waterTemp = "—";
  let gageHeight = "—";

  if (weatherRes.status === "fulfilled" && weatherRes.value?.ok) {
    const data = await weatherRes.value.json();
    const current = data.current;
    airTemp = `${Math.round(current.temperature_2m)}°F`;
    wind = `${Math.round(current.wind_speed_10m)} mph ${degreesToCompass(current.wind_direction_10m)}`;
  }

  if (usgsRes.status === "fulfilled" && usgsRes.value && (usgsRes.value as Response).ok) {
    const data = await (usgsRes.value as Response).json();
    const timeSeries: Array<{
      variable: { variableCode: Array<{ value: string }> };
      values: Array<{ value: Array<{ value: string }> }>;
    }> = data?.value?.timeSeries ?? [];

    for (const series of timeSeries) {
      const code = series.variable.variableCode[0]?.value;
      const latest = series.values[0]?.value[0]?.value;

      if (code === "00010" && latest) {
        const celsius = parseFloat(latest);
        if (!isNaN(celsius) && celsius > -50 && celsius < 50) {
          waterTemp = `${Math.round((celsius * 9) / 5 + 32)}°F`;
        }
      }

      if (code === "00065" && latest) {
        const ft = parseFloat(latest);
        if (!isNaN(ft)) {
          gageHeight = `${ft.toFixed(1)}ft`;
        }
      }
    }
  }

  return { airTemp, wind, waterTemp, gageHeight };
}
