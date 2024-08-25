import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const hendleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

const SignInDialog = () => {
    return (   
    <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
            <DialogTitle> Faça login na plataforma</DialogTitle>
            <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
        </DialogHeader>
        <Button variant="outline" className="gap-2 font-bold"
        onClick={hendleLoginWithGoogleClick}>
            <FcGoogle size={30}/>
            Google
        </Button>
    </DialogContent> );
}
 
export default SignInDialog;