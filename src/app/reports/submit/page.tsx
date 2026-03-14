import ReportForm from "./ReportForm";

export const metadata = {
  title: "Submit a Report – LakeReel",
};

export default async function SubmitReportPage({
  searchParams,
}: {
  searchParams: Promise<{ lake?: string }>;
}) {
  const { lake } = await searchParams;
  return <ReportForm defaultLake={lake ?? ""} />;
}
