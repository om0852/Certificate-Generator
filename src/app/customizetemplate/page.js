"use client"
import FileSelector from "../component/FileSelector";
import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";



export default function Page() {
   
   
    
    return (
        <>
  <div class="container mx-auto py-8">
        
        <div className="flex flex-row">
            {/* <!-- Sidebar (Optional) --> */}
            <div className="flex-row  mr-10 w-full ">
                <Sidebar  />
               <div>
                <FileSelector />
                </div>
                
               
            </div>
          
            
      
        </div>
    </div>

        </>
    );
}
