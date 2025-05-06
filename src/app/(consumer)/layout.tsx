import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { ReactNode, Suspense } from "react";

const ConsumerLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ConsumerLayout;

function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <Link className="mr-auto text-lg hover:underline px-2" href="/">
          Web Dev Simplified
        </Link>

        <Suspense fallback={'Loading'}>
          <SignedIn>
          <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/admin"
            >
              Admin
            </Link>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/courses"
            >
              My Courses
            </Link>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/purchases"
            >
              Purchase History
            </Link>
            <div className="size-8 self-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {width: '100%', height: '100%'}
                  }
                }}
                />
            </div>
          </SignedIn>
        </Suspense>

        <Suspense>
          <SignedOut>
            <Button className="self-center" asChild>
              <SignInButton> Sign In</SignInButton>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  );
}
