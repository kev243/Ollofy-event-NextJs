"use client";

import { WaitlistSignup } from "./_components/waitlist-signup";

// import { WaitlistSignup } from "./components/waitlist-signup"
// import { Toaster } from "@/components/ui/toaster"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;
// const backgroundStyle = `
//   .bg-pattern {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: white;
//     background-image:
//       linear-gradient(to right, rgba(0,0,0,0.1) 2px, transparent 2px),
//       linear-gradient(to bottom, rgba(0,0,0,0.1) 2px, transparent 2px);
//     background-size: 100px 100px; /* Taille des carrés */
//     pointer-events: none;
//     z-index: 1;
//   }

//   .content {
//     position: relative;
//     z-index: 2;
//   }
// `;

export default function WaitlistPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <WaitlistSignup />
      </div>
      {/* <Toaster
        toastOptions={{
          style: {
            background: "rgb(23 23 23)",
            color: "white",
            border: "1px solid rgb(63 63 70)",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      /> */}
    </main>
  );
}
