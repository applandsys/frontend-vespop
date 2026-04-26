
import React from "react";
import { ReduxProvider } from '@/providers/ReduxProvider';
import Footer from "@/components/theme/Footer";
import Header from "@/components/layouts/Header";
import {SnackbarProvider} from "@/components/ui/SnackbarProvider";
import MobileFooterMenu from "@/components/ecommerce/MobileFooterMenu";

export const metadata = {
    title: "Ecommerce Website ",
    description: "Shop and fun",
};

export default function EcommerceFrontLayout({ children }) {
    return (
        <div >
            <ReduxProvider>
                <SnackbarProvider>
                    <Header/>
                    <main className="min-h-screen flex flex-col md:px-8 mx-auto ">
                        {children}
                    </main>
                    <Footer/>
                </SnackbarProvider>
                <MobileFooterMenu />
            </ReduxProvider>
        </div>
    );
}
