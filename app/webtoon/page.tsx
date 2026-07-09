import WebToon from "@/app/webtoon/webtoon"
import DevtoolsGuard from "./DevtoolsGuard";

export default function webtoonPage() {
  return(
    <DevtoolsGuard>
      <WebToon />;
  </DevtoolsGuard>
  )
}
