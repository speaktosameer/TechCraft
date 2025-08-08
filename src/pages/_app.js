import dynamic from "next/dynamic";
import "../App.css"; // adjust path if needed (maybe "../src/App.css")

// Dynamically import your SPA App component and disable SSR
const App = dynamic(() => import("../src/App"), { ssr: false });

export default function MyApp() {
  return <App />;
}
