import React from 'react';
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";

function EcommerceLayout({children}) {
    return (
        <EcommerceFrontLayout>
            <>
                {children}
            </>
        </EcommerceFrontLayout>
    );
}

export default EcommerceLayout;