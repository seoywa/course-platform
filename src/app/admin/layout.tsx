import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { canAccessAdminPages } from "@/permissions/general";
import { getCurrentUser } from "@/services/clerk";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { ReactNode, Suspense } from "react";

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};



function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link className="text-lg hover:underline" href="/">
            Web Dev Simplified
          </Link>
          <Badge>Admin</Badge>

        </div>

        <Suspense fallback={'Loading'}>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/admin/courses"
            >
              Courses
            </Link>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/admin/products"
            >
              Products
            </Link>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/admin/sales"
            >
              Sales
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

async function AdminLink() {
  const user = await getCurrentUser({ allData: true });

  if (!canAccessAdminPages(user)) return null;
  
  return (
    <Link
      className="hover:bg-accent/10 flex items-center px-2"
      href="/admin"
    >
      Admin
    </Link>
  )
}

export default AdminLayout;