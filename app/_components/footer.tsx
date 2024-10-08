import { Card, CardContent } from "./ui/card";


const Footer = () => {
    return ( 
        <footer>
        <Card className="mt-5 ">
              <CardContent className="px-5 py-6">
                  <p className= "text-xs text-gray-400 ">
                      @2024 Copyright 
                      <span className="font-bold"> FSW Barber </span> </p> 
              </CardContent>
           </Card>  
      </footer>
     );
}
 
export default Footer;