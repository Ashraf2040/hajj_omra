
import { Roboto } from "next/font/google";
import "./globals.css";
import "./globalicon.css";
import Header from "./components/Header";
import Footers from "./components/Footer";
import Footer from "./components/Footer";
import { AccordionDemo } from "./components/AccordionDemo";

const inter = Roboto({ subsets: ["latin"],weight: ["100",  "300", "400", "700"] });

export const metadata = {
  title: "AI Assistant",
  description: "A.I Assistant for the Guests of Allah",
};

export default function RootLayout({children}) {
  return (
    <html  lang="en" className="m-0 p-0 bg-white ">
      <body className={`${inter.className} flex relative flex-col h-screen`}>
        <div>
          <Header />
        </div>
        <div>{children}</div>

        <div className="">
          <Footer />
        </div>
      </body>
    </html>
  );
}
