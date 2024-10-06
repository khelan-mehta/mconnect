"use client";
import Link, { LinkProps } from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");

    // Show the loading state
    setIsLoading(true);
    body?.classList.add("page-transition");

    // Wait for the transition effect
    await sleep(500);

    // Navigate to the new page
    await router.push(href);

    // Wait for the transition to finish
    await sleep(500);

    // Clean up the loading state
    body?.classList.remove("page-transition");
    setIsLoading(false);
  };

  return (
    <>
      <Link {...props} href={href} onClick={handleTransition}>
        {children}
      </Link>
      {isLoading && (
        <>
          <div id="black-screen" className="black-screen" />
          <div className="orbiting-ion">
            <div className="ion" />
          </div>
        </>
      )}
    </>
  );
};
