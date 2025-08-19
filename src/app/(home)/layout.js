
import Header from "../components/header/Header";
export default async function HomeLayout({ children }) {

  return (
    <html lang="en">

      <body className="px-20" >

    
          <Header />
       
        

          {children}
       
      </body>
    </html>
  );
}
