import "./globals.css";
import { Quicksand } from 'next/font/google';

import {Toaster} from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div>
              {children}
              <Toaster position="top-right" reverseOrder={false} />
          </div>
      </body>
    </html>
  );
}
