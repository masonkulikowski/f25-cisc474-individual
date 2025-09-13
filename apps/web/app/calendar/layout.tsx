import RootLayout from "../layout";

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout month="October">{children}</RootLayout>;
}