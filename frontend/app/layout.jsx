import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import Footer from "@/components/footer/Footer";
import Script from 'next/script'

import Header from "@/components/header/Header";

export const metadata = {
  title: "AGRIFARM",
  description: "Rent Farming tools",
};

const RootLayout = ({ children }) => {
  return (
    <>
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Nav /> {/* Include the Nav component here */}
            
            {children}
            <br />
            <br />
            <Footer/>
          </main>
        </Provider>
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"
    />
    </>
  );
};

export default RootLayout;
