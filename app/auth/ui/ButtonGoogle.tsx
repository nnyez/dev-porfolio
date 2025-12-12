import { signInWithGoogle as registerGoogleUser } from "@/app/lib/firebaseAuth";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";

export default function ButtonGoogle({
  isRegister = true,
}: {
  isRegister?: boolean;
}) {
  const router = useRouter();
  const handleRegisterGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerGoogleUser();
      router.push("/dashboard/profile");
    } catch (erro) {
      const error = erro as Error;
      console.log("Error capturado en el componente Register:", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleRegisterGoogle}
      className="bg-accent hover:bg-resalt text-secondary flex items-center justify-center gap-x-2 rounded-md p-2"
    >
      <GoogleIcon />
      {isRegister ? "Registrarte con Google" : "Entrar con Google"}
    </button>
  );
}
