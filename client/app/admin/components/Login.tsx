"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        axios.post("http://localhost:8000/api/auth/login", data).then(res => {


            if (res.status === 200) {
                console.log(res.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="w-full h-full flex items-center justify-center gap-x-8">
            <Image
                src="/admin-image.png"
                alt="Admin Image"
                width={500}
                height={500}
            />
            <div className="flex flex-col items-center justify-center w-[400px] border rounded-lg py-6 px-4">
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <h1 className="text-lg font-semibold">Giriş Yap</h1>
                    <p className="text-sm text-[#787878]">Tekrar hoş geldin.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-11/12 mt-6 space-y-6">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="username">Kullanıcı Adı</Label>
                        <Input {...register("username")} type="text" id="username" name="username" placeholder="Kullanıcı Adı" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="password">Şifre</Label>
                        <Input {...register("password")} type="password" id="password" placeholder="Şifre" />
                    </div>
                    <Button type="submit" variant="primary" className="w-full rounded-lg">
                        Giriş Yap
                    </Button>
                </form>
            </div>
        </div>
    );
}