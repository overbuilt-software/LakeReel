import { NextRequest, NextResponse } from "next/server";

// USGS parameter codes
// 00010 = water temperature (Celsius)
// 00065 = gage height (feet)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");

  if (!siteId) {
    return NextResponse.json({ error: "siteId required" }, { status: 400 });
  }

  try {
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteId}&parameterCd=00010,00065&siteStatus=active`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hour
    if (!res.ok) throw new Error("USGS fetch failed");

    const data = await res.json();
    const timeSeries: Array<{
      variable: { variableCode: Array<{ value: string }> };
      values: Array<{ value: Array<{ value: string }> }>;
    }> = data?.value?.timeSeries ?? [];

    let waterTemp: string | null = null;
    let gageHeight: string | null = null;

    for (const series of timeSeries) {
      const code = series.variable.variableCode[0]?.value;
      const latest = series.values[0]?.value[0]?.value;

      if (code === "00010" && latest) {
        const celsius = parseFloat(latest);
        if (!isNaN(celsius)) {
          const fahrenheit = Math.round((celsius * 9) / 5 + 32);
          waterTemp = `${fahrenheit}°F`;
        }
      }

      if (code === "00065" && latest) {
        const ft = parseFloat(latest);
        if (!isNaN(ft)) {
          gageHeight = `${ft.toFixed(1)}ft`;
        }
      }
    }

    return NextResponse.json({ waterTemp, gageHeight });
  } catch {
    return NextResponse.json({ error: "USGS data unavailable" }, { status: 503 });
  }
}
