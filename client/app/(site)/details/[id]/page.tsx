"use client";

import { use, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import Navbar from "../../components/Navbar";
import DetailsHeader from "../components/DetailsHeader";
import axios from "axios";

export default function Details({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [properties, setProperties] = useState();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/listings/${id}`).then(res => {
            if (res.status === 200) {
                setProperties(res.data);
            }
        }).catch(error => {
            console.log("Something went wrong", error);
        });
    }, [id]);

    if (!properties) {
        return (
            <p>
                Yükleniyor...
            </p>
        );
    }

    return (
        <div>
            <Navbar normal={false} />
            <DetailsHeader properties={properties} />
            <Map />
            <Footer />
        </div>
    );
}