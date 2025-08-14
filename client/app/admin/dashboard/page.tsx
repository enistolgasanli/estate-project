"use client";

import { useEffect } from "react";
import { DashboardDataTable } from "./components/DashboardDataTable";
import axios from "axios";

export default function Dashboard() {
    useEffect(() => {
        axios.get("http://localhost:8000/api/listings").then(res => {
            if (res.status === 200) {
                console.log(res.data);
            }
        }).catch(error => {
            console.log("Something went wrong", error);
        });
    }, []);

    return (
        <div className="w-full h-full mt-16">
            <DashboardDataTable />
        </div>
    );
}