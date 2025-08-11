import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center w-[400px] border rounded-lg py-6 px-4">
            <div className="flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-lg">Giriş Yap</h1>
                <p className="text-sm text-[#787878]">Tekrar hoş geldin.</p>
            </div>
            
            <form action="" className="w-full max-w-11/12 mt-6 space-y-6">
                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="username">Kullanıcı Adı</Label>
                    <Input type="text" id="username" placeholder="Kullanıcı Adı" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input type="password" id="password" placeholder="Şifre" />
                </div>
                <Button variant="primary" className="w-full rounded-lg">
                    Giriş Yap
                </Button>
            </form>
        </div>
    );
}