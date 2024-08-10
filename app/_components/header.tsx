import Image from "next/image";
import {Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { Icon, MenuIcon } from "lucide-react";



const Header = () => {
    return ( <Card>
        <CardContent className="flex flex-row itens-center justify-between p-5">
            <Image alt="Fsw barber" src="/Logo.png" height={18} width={120} />
            <Button size="icon" variant="outline">
                <MenuIcon/>
            </Button>
        </CardContent>
    </Card> );
}
 
export default Header;