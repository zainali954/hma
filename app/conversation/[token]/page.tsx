import type { Metadata } from "next";
import ConversationChat from "./ConversationChat";

export const metadata: Metadata = {
  title: "Your Conversation — HMA Dubai",
  robots: { index: false, follow: false },
};

export default function ConversationPage() {
  return <ConversationChat />;
}
