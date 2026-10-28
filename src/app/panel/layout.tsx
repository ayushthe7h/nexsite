import type { Metadata } from "next";

// This route is a cosmetic, client-side-only demo (see
// docs/SECURITY-checkup.md) - it doesn't control the real server. Keeping
// it out of search results avoids it being mistaken for a real staff tool.
export const metadata: Metadata = {
  title: "Control Panel Preview — NexCoreMC",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
