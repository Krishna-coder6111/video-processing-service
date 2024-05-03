'use client';

import Link from "next/link";
import Image from "next/image"; // Import the Image component from the next/image package
import styles from "./navbar.module.css"; 
import youtube_logo from "./youtube-logo.svg"; 
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";
import SignIn from "./sign-in";

export default function Navbar() {
    const [user,setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return(
        <nav className={styles.nav}> 
            <Link href="/">
                <span className={styles.logoContainer}>
                <Image src={youtube_logo} alt="Youtube Logo" width={90} height={20} />
                </span>
            </Link>
            <SignIn user={user}/>

        </nav>
    );
}  