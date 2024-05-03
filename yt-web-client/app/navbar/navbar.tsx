import Link from "next/link";
import Image from "next/image"; // Import the Image component from the next/image package
import styles from "./navbar.module.css"; 
import youtube_logo from "./youtube-logo.svg"; 
export default function Navbar() {
    return(
        <nav className={styles.nav}> 
            <Link href="/">
                <Image src={youtube_logo} alt="Youtube Logo" width={90} height={20} />
            </Link>
        </nav>
    );
}  