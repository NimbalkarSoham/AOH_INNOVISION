import "@/styles/globals.css";

import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

export const metadata = {
  title: "AGRIFARM",
  description: "Rent Farming tools",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Nav />
            {children}
            <footer className="mt-96 green1  text-white width-[100] p-4 text-center text-xl">
              <p>Contact Us:</p>
              <p>Email: agrifarm@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Main St, City, Country</p>
            </footer>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
