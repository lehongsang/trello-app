

import getUserAuthenticated from "./data/users/getUserAuthenticated";
import "./globals.css";
import {UserProvider} from "./userProvider/UserProvider";
export const metadata = {
  title: "Create Next App",
};
export default async function RootLayout({ children }) {
 const user = await getUserAuthenticated()
  return (
    <html lang="en">
      <body  >
        <UserProvider user_init = {user} >
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
